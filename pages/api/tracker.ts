import { NextApiRequest, NextApiResponse } from 'next'
import { VideoStatus } from '../../models/VideoStatus'

export const getNearestStream = async (id: string) => {
  const response = await fetch(
    `https://holodex.net/api/v2/videos?channel_id=${id}&status=upcoming&type=stream&max_upcoming_hours=48`,
    {
      headers: {
        'X-APIKEY': process.env.HOLODEX_API!,
      },
    }
  )
  const getNearestStreamJson = await response.json()
  if (getNearestStreamJson[0]) {
    const nextStream = getNearestStreamJson[getNearestStreamJson.length - 1]
    const dater = new Date(nextStream.available_at)
    let timeUntil = (dater.getTime() - Date.now()) / 1000
    let humanReadable = ''
    const days = Math.floor(timeUntil / 86400)
    timeUntil %= 86400
    const hours = Math.floor(timeUntil / 3600)
    timeUntil %= 3600
    const minutes = Math.floor(timeUntil / 60)
    timeUntil %= 60
    const seconds = Math.floor(timeUntil)
    if (days > 0) humanReadable += `${days} days `
    if (hours > 0) humanReadable += `${hours} hours `
    if (minutes > 0) humanReadable += `${minutes} minutes `
    if (seconds > 0) humanReadable += `${seconds} seconds `
    humanReadable += 'until next stream'
    return { video: nextStream.id, time: humanReadable }
  }
}

export const getLastVideo = async (id: string) => {
  const latestVideo = await fetch(`https://holodex.net/api/v2/videos?channel_id=${id}&status=past&type=stream`, {
    headers: {
      'X-APIKEY': process.env.HOLODEX_API!,
    },
  })
  const latestVideoJson = await latestVideo.json()
  return latestVideoJson[0]?.id ?? null
}

export async function getLiveData(channels: string[]): Promise<VideoStatus[]> {
  const channelIds = channels.join(',')
  const liveUpcomingVideos = await fetch(`https://holodex.net/api/v2/users/live?channels=${channelIds}`, {
    headers: {
      'X-APIKEY': process.env.HOLODEX_API!,
    },
  })
  const lives: Array<any> = await liveUpcomingVideos.json()
  const renderedDataArray = [] as VideoStatus[]
  for (const channel of channels) {
    const thisLiveUpcoming = lives.filter(videos => videos.channel.id === channel)
    const hasLiveStatus = thisLiveUpcoming.find(video => video.status === 'live')
    const vsChannel = { id: channel } as VideoStatus
    if (hasLiveStatus) {
      vsChannel.status = 'live'
      vsChannel.video = hasLiveStatus.videoId
    } else {
      const [checkUpcoming, lastVideo] = await Promise.all([
        getNearestStream(vsChannel.id!),
        getLastVideo(vsChannel.id!),
      ])
      if (checkUpcoming) {
        vsChannel.status = 'upcoming'
        vsChannel.video = checkUpcoming.video
        vsChannel.time = checkUpcoming.time
      } else if (lastVideo) {
        vsChannel.status = 'offline'
        vsChannel.video = lastVideo
      }
    }
    renderedDataArray.push(vsChannel)
  }
  return renderedDataArray
}

const liveData = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(await getLiveData(JSON.parse(req.body)))
}

export default liveData

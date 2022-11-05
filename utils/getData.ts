import { VideoStatus } from '../models/VideoStatus'

export async function getData(id: string): Promise<VideoStatus> {
  const response = await fetch(`https://holodex.net/api/v2/live?channel_id=${id}`, {
    cache: 'no-store',
    headers: {
      'x-api-key': process.env.HOLODEX_API!,
    },
  })
  const checkLiveJson = await response.json()
  for (let i = 0; i < checkLiveJson.length; i++) {
    if (checkLiveJson[i].status === 'live') {
      return { id: id, status: 'live', video: checkLiveJson[i].id }
    }
  }
  const getNearestStream = await fetch(
    `https://holodex.net/api/v2/videos?channel_id=${id}&status=upcoming&type=stream&max_upcoming_hours=48`,
    {
      cache: 'no-store',
      headers: {
        'x-api-key': process.env.HOLODEX_API!,
      },
    }
  )
  const getNearestStreamJson = await getNearestStream.json()
  if (getNearestStreamJson[0]) {
    const dater = new Date(
      getNearestStreamJson[getNearestStreamJson.length - 1].available_at
    )
    let timeUntil = (dater.getTime() - Date.now()) / 1000
    let humanReadable = `${timeUntil} seconds until next stream`
    if (timeUntil > 60) {
      timeUntil = timeUntil / 60
      humanReadable = `${Math.floor(timeUntil)} minutes until next stream`
      if (timeUntil > 60) {
        timeUntil = timeUntil / 60
        let minutes = timeUntil.toString().substring(timeUntil.toString().indexOf('.'))
        minutes = String(Number(minutes) * 60)
        if (minutes.length > 2) {
          minutes = minutes.slice(0, 2)
        }
        humanReadable = `${timeUntil
          .toString()
          .substring(
            0,
            timeUntil.toString().indexOf('.')
          )} hours and ${minutes} minutes until next stream`
        if (timeUntil > 24) {
          timeUntil = timeUntil / 24
          let hours = timeUntil.toString().substring(timeUntil.toString().indexOf('.'))
          minutes = String(Number(minutes) * 24)
          if (hours.length > 2) {
            hours = hours.slice(0, 2)
          }
          humanReadable = `${timeUntil
            .toString()
            .substring(
              0,
              timeUntil.toString().indexOf('.')
            )} days and ${hours} hours until next stream`
        }
      }
    }
    return {
      id: id,
      status: 'upcoming',
      video: getNearestStreamJson[getNearestStreamJson.length - 1].id,
      time: humanReadable,
    }
  }
  const latestVideo = await fetch(
    `https://holodex.net/api/v2/videos?channel_id=${id}&status=past&type=stream`,
    {
      cache: 'no-store',
      headers: {
        'x-api-key': process.env.HOLODEX_API!,
      },
    }
  )
  const latestVideoJson = await latestVideo.json()
  return { id: id, status: 'offline', video: latestVideoJson[0].id }
}

import Image, { StaticImageData } from 'next/image'
import { ChannelObj } from '../models/Channel';
import { VideoStatus } from '../models/VideoStatus';
import { ClientComponentChannel } from './ClientComponentChannel';

interface Props {
    channel: ChannelObj
    image: StaticImageData
}

async function getData(id: string): Promise<VideoStatus> {
    const response = await fetch(`https://holodex.net/api/v2/live?channel_id=${id}`,
    {
      headers: {
      'x-api-key': process.env.HOLODEX_API!,
      },
    })
  
    const checkLiveJson = await response.json()
    for (let i = 0; i < checkLiveJson.length; i++) {
        if (checkLiveJson[i].status === 'live') {
            return({id: id, status: 'live', video: checkLiveJson[i].id})
        }
    }
    const getNearestStream = await fetch(`https://holodex.net/api/v2/videos?channel_id=${id}&status=upcoming&type=stream&max_upcoming_hours=48`,
    {
      headers: {
      'x-api-key': process.env.HOLODEX_API!,
      },
    })
    const getNearestStreamJson = await getNearestStream.json()
    if (getNearestStreamJson[0]) {
        return ({id: id, status: 'upcoming', video: getNearestStreamJson[0].id})
    }
    const latestVideo = await fetch(`https://holodex.net/api/v2/videos?channel_id=${id}&status=past&type=stream`)
    const latestVideoJson = await latestVideo.json()
    return ({id: id, status: 'offline', video: latestVideoJson[0].id})
}

export async function Channel({ channel, image }: Props) {
    const data = await getData(channel.id);

    return (
        <ClientComponentChannel channel={channel} image={image} data={data}/>
    );

}
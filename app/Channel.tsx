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
    const notLive = await fetch(`https://holodex.net/api/v2/videos?channel_id=${id}`,
    {
      headers: {
      'x-api-key': process.env.HOLODEX_API!,
      },
    })
    const notLiveJson = await notLive.json()
    return ({id: id, status: 'offline', video: notLiveJson[0].id})
}

export async function Channel({ channel, image }: Props) {
    const data = await getData(channel.id);

    return (
        <ClientComponentChannel channel={channel} image={image} data={data}/>
    );

}
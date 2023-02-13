"use client"

import { ChannelObj } from '../models/Channel'
import channels from '../assets/holoen.json'
import { Channel } from './Channel'
import { useImage } from './imageArray'
import useSWR from 'swr'
import { VideoStatus } from '../models/VideoStatus'

export function Channels() {
  const images = useImage
  const { data, error } = useSWR(
    'http://localhost:3000/api/tracker',
    async () => {
      const infos = await fetch('http://localhost:3000/api/tracker', { cache: "no-cache" });
      const infosJson: VideoStatus[] = await infos.json();
      return infosJson;
    },
    { refreshInterval: 60000 }
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className={`flex items-center justify-center flex-wrap absolute bottom-4`}>
      {channels.map((channel: ChannelObj, i: number) => {
        let channelData = data.filter(status => status.id === channel.id)[0]
        return(
          <div key={channel.id}>
            <Channel channel={channel} image={images[i]} data={channelData}/>
          </div>
        )
      })}
    </div>
  )
}

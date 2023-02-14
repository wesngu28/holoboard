"use client"

import { ChannelObj } from '../../models/Channel'
import channels from '../../assets/holoen.json'
import { Channel } from './Channel'
import { useImage } from '../imageArray'
import useSWR from 'swr'
import { VideoStatus } from '../../models/VideoStatus'

export function Channels() {
  const images = useImage
  // const { data, error } = useSWR(
  //   'http://localhost:3000/api/tracker',
  //   async () => {
  //     const infos = await fetch('http://localhost:3000/api/tracker', { cache: "no-cache" });
  //     const infosJson: VideoStatus[] = await infos.json();
  //     return infosJson;
  //   },
  //   { refreshInterval: 60000 }
  // );

  return (
    !data ? <h2 className="text-lg font-semibold mt-4">Fetching data...</h2>
    : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
    : <div className={`grid grid-cols-6 xs:grid-cols-8 md:grid-cols-10 lg:grid-cols-11 max-w-6xl absolute bottom-4`}>
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

"use client"

import { ChannelObj } from '../../models/Channel'
import channels from '../../assets/holoen.json'
import useSWR from 'swr'
import { VideoStatus } from '../../models/VideoStatus'
import Image from 'next/image'

interface Props { setVid: (video: VideoStatus) => void}
export function Channels({setVid}: Props) {
  const { data, error } = useSWR("get channel",
    async () => {
      const infos = await fetch(`${process.env.NEXT_PUBLIC_SITE}/api/tracker`, {
        method: "POST",
        headers: {
        "x-api-key": process.env.HOLODEX_API!,
        },
        body: JSON.stringify(channels.map(channel => channel.id))
      });
      const infosJson: VideoStatus[] = await infos.json();
      return infosJson;
    },
    { refreshInterval: 60000 }
  );

  return (
    !data ? <h2 className="text-lg font-semibold mt-4">Fetching data...</h2>
    : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
    : <div className={`grid grid-cols-6 xs:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 max-w-6xl max-h-48 absolute bottom-4`}>
      {channels.map((channel: ChannelObj, i: number) => {
        let channelData = data.filter(status => status.id === channel.id)[0]
        return(
          <div key={channel.id}>
            <Image
              title={channelData.time}
              onClick={() => setVid(channelData)}
              className={
                channelData.status === 'live'
                  ? 'opacity-100'
                  : channelData.time?.includes('minutes') && !channelData.time?.includes('hours')
                  ? 'opacity-60'
                  : channelData.time?.includes('hours')
                  ? 'opacity-40'
                  : channelData.time?.includes('days') && !channelData.time?.includes('hours')
                  ? 'opacity-20'
                  : 'opacity-10'
              }
              src={`/${channel.name}.jpg`}
              alt={channel.name}
              width={800} height={800}
            />
          </div>
        )
      })}
    </div>
  )
}

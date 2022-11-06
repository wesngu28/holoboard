'use client'

import Image, { StaticImageData } from 'next/image'
import { useContext } from 'react'
import useSWR from 'swr'
import { ChannelObj } from '../models/Channel'
import { VideoStatus } from '../models/VideoStatus'
import { getData } from '../utils/getData'
import { VideoContext } from './VideoContext'

interface Props {
  channel: ChannelObj
  image: StaticImageData
  ssrdata: VideoStatus
}

export function ClientComponentChannel({ channel, image, ssrdata }: Props) {
  const videoContext = useContext(VideoContext)
  const swrFetch = async (id: string) => {
    const infos = await getData(id)
    return infos
  }

  const { data, error } = useSWR(channel.id, swrFetch, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
  })

  return (
    <div className="relative max-[420px]:h-[15vw] max-[420px]:w-[15vw] h-[12vw] w-[12vw] md:h-[6vw] md:w-[6vw]">
      {data ? (
        <Image
          title={data.time}
          onClick={() => videoContext?.setVideo(data)}
          className={
            data.status === 'live'
              ? 'opacity-100'
              : data.time?.includes('minutes') && !data.time?.includes('hours')
              ? 'opacity-60'
              : data.time?.includes('hours')
              ? 'opacity-40'
              : data.time?.includes('days') && !data.time?.includes('hours')
              ? 'opacity-20'
              : 'opacity-10'
          }
          src={image}
          alt={channel.name}
        />
      ) : (
        <Image
          title={ssrdata.time}
          onClick={() => videoContext?.setVideo(ssrdata)}
          className={
            ssrdata.status === 'live'
              ? 'opacity-100'
              : ssrdata.time?.includes('minutes') && !ssrdata.time?.includes('hours')
              ? 'opacity-60'
              : ssrdata.time?.includes('hours')
              ? 'opacity-40'
              : ssrdata.time?.includes('days') && !ssrdata.time?.includes('hours')
              ? 'opacity-20'
              : 'opacity-10'
          }
          src={image}
          alt={channel.name}
        />
      )}
    </div>
  )
}

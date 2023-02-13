'use client'

import Image, { StaticImageData } from 'next/image'
import { useContext } from 'react'
import { ChannelObj } from '../models/Channel'
import { VideoStatus } from '../models/VideoStatus'
import { VideoContext } from './VideoContext'

interface Props {
  channel: ChannelObj
  image: StaticImageData
  data: VideoStatus
}

export function Channel({ channel, image, data }: Props) {
  const videoContext = useContext(VideoContext)!

  return (
    <div className="relative max-[420px]:h-[15vw] max-[420px]:w-[15vw] h-[12vw] w-[12vw] md:h-[6vw] md:w-[6vw]">
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
    </div>
  )
}

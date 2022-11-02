'use client';

import Image, { StaticImageData } from 'next/image'
import { useContext } from 'react';
import { ChannelObj } from '../models/Channel';
import { VideoStatus } from '../models/VideoStatus';
import { VideoContext } from './VideoContext';

interface Props {
    channel: ChannelObj
    image: StaticImageData
    data: VideoStatus
}

export function ClientComponentChannel({ channel, image, data }: Props) {
    const videoContext = useContext(VideoContext)

    return (
        <div className='relative h-[6vw] w-[6vw]'>
            <Image onClick={() => videoContext?.setVideo(data)} className={data.status === 'live' ? 'opacity-100' : 'opacity-50'} src={image} alt={channel.name} />
        </div>
    );

}
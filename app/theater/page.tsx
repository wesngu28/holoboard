"use client"

import { Channels } from './Channels'
import { Video } from './Video'
import { useState } from 'react';
import { VideoStatus } from '../../models/VideoStatus';
import Link from 'next/link';

export default function Home() {
  const [video, setVideo] = useState({status: "''", video: "-t8Za0T1T8M"});
  const handleVideoChange = (video: VideoStatus) => {
    setVideo(video);
  };
  return (
    <main className="p-2 min-h-screen max-h-screen overflow-y-hidden flex-1 flex flex-col items-center justify-center">
      <Link className="fill-white p-4 absolute left-0 top-0 hover:cursor-pointer" href={'/'}>
      <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
      </Link>
      <Video video={video}/>
      <Channels setVid={handleVideoChange}/>
    </main>
  )
}

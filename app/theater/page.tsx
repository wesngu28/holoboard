"use client"

import { Channels } from './Channels'
import { Video } from './Video'
import { useState } from 'react';
import { VideoStatus } from '../../models/VideoStatus';

export default function Home() {
  const [video, setVideo] = useState({status: "''", video: "-t8Za0T1T8M"});
  const handleVideoChange = (video: VideoStatus) => {
    setVideo(video);
  };
  return (
    <main className="p-2 min-h-screen max-h-screen overflow-y-hidden flex-1 flex flex-col items-center justify-center">
      <header className="text-2xl absolute top-4">
        <p>HoloEN Board</p>
      </header>
      <Video video={video}/>
      <Channels setVid={handleVideoChange}/>
    </main>
  )
}

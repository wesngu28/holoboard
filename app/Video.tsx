'use client';

import { useContext, useState } from "react";
import { VideoContext } from "./VideoContext";

export function Video() {
  const videoContext = useContext(VideoContext)
  const vid = videoContext?.video?.video

  return (
      vid ?
        <div className="relative w-full h-0 p-4 pb-[56.25%] flex flex-row">
          <iframe className="absolute w-[75%] p-4 inset-0 h-[50%]" src={`https://www.youtube.com/embed/${videoContext?.video?.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="350" height="315" src={`https://www.youtube.com/live_chat?v=${videoContext?.video?.video}&embed_domain=localhost`} ></iframe>
        </div> : null
  )
}
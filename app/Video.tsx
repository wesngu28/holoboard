'use client';

import { useContext, useState } from "react";
import { VideoContext } from "./VideoContext";

export function Video() {
  const videoContext = useContext(VideoContext)
  const vid = videoContext?.video?.video

  return (
    <div>
      {vid &&
        <div>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoContext?.video?.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe width="350" height="500" src={`https://www.youtube.com/live_chat?v=${videoContext?.video?.video}&embed_domain=localhost`} ></iframe>
        </div>}
    </div>
  )
}
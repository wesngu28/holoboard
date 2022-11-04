'use client';

import { useContext } from "react";
import { VideoContext } from "./VideoContext";

export function Video() {
  const videoContext = useContext(VideoContext)
  const vid = videoContext?.video?.video

  return (
      vid ?
        <div className="mb-[15vh] w-[90vw] h-[80vh] md:h-[66.625vh] p-4 flex flex-col md:flex-row items-center justify-center">
          <iframe className="w-[100vw] h-[73.6625vh] md:w-[90vw] md:h-[66.625vh]  m-0 md:ml-[2vw] md:mr-[2vw] mb-[4vh]" src={`https://www.youtube.com/embed/${videoContext?.video?.video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <iframe className="w-[100%] h-[100%] md:w-[auto] md:h-[66.625vh]" src={`https://www.youtube.com/live_chat?v=${videoContext?.video?.video}&embed_domain=holoboard.vercel.app`} ></iframe>
        </div> : null
  )
}
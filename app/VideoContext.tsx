'use client';

import { createContext, useState } from "react";
import { VideoStatus } from "../models/VideoStatus";

type VideoContextProviderProps = {
  children: React.ReactNode
}

type VideoContextType = {
  video: VideoStatus | null,
  setVideo: React.Dispatch<React.SetStateAction<VideoStatus | null>>
}

export const VideoContext = createContext<VideoContextType | null>(null)

export const VideoContextProvider = ({children}: VideoContextProviderProps) => {
  const [video, setVideo] = useState<VideoStatus | null>(null)
  return <VideoContext.Provider value={{video, setVideo}}>{children}</VideoContext.Provider>
}
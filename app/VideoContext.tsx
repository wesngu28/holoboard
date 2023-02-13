'use client';

import { createContext, useState } from "react";
import { VideoStatus } from "../models/VideoStatus";

type VideoContextProviderProps = {
  children: React.ReactNode
}

type VideoContextType = {
  video: VideoStatus,
  setVideo: React.Dispatch<React.SetStateAction<VideoStatus>>
}

const defaultVideo = {
  status: '',
  video: 'NqzUaMtF4eo'
}

export const VideoContext = createContext<VideoContextType | null>(null)

export const VideoContextProvider = ({children}: VideoContextProviderProps) => {
  const [video, setVideo] = useState<VideoStatus>(defaultVideo)
  return <VideoContext.Provider value={{video, setVideo}}>{children}</VideoContext.Provider>
}
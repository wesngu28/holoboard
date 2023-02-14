import { Channels } from './Channels'
import { Video } from './Video'
import { VideoContextProvider } from '../VideoContext'

export default function Home() {
  return (
    <main className="p-2 min-h-screen max-h-screen overflow-y-hidden flex-1 flex flex-col items-center justify-center">
      <header className="text-2xl absolute top-4">
        <p>HoloEN Board</p>
      </header>
      <VideoContextProvider>
        <Video />
        <Channels />
      </VideoContextProvider>
    </main>
  )
}

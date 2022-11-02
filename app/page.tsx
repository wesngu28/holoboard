import { Channels } from './Channels';
import { Video } from './Video';
import { VideoContextProvider } from './VideoContext';

export default function Home() {



  return (
    <main className="p-4 min-h-screen max-h-screen overflow-y-hidden flex-1 flex flex-col items-center justify-center">
        <header className="text-4xl m-8 absolute top-0">
          <p>Video Board</p>
        </header>

      <VideoContextProvider>
          <Video />

          <Channels />
      </VideoContextProvider>
    </main>
  )
}

import { Channels } from './Channels';
import Header from './Header';
import { Video } from './Video';
import { VideoContextProvider } from './VideoContext';

export default function Home() {



  return (
    <main className="p-2 min-h-screen max-h-screen overflow-y-hidden flex-1 flex flex-col items-center justify-center">
      <Header />

      <VideoContextProvider>
          <Video />

          <Channels />
      </VideoContextProvider>
    </main>
  )
}

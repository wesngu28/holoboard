import { Channels } from './Channels';
import { Video } from './Video';
import { VideoContextProvider } from './VideoContext';

export default function Home() {

  return (
    <main className="p-4 min-h-screen max-h-screen overflow-y-hidden flex-1 flex flex-col items-center justify-center">
      <div className='flex items-start justify-center'>
        <h1 className="text-4xl m-8 absolute top-0">Video Board</h1>
      </div>

      <VideoContextProvider>
          <Video />

          <Channels />
      </VideoContextProvider>
    </main>
  )
}

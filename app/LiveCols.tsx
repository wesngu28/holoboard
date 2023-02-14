import { VideoStatus } from '../models/VideoStatus'

interface Props { channel: VideoStatus }
export default function Livebar({channel}: Props) {
  return (
    <div className="flex ml-4">
      <span title={channel.time} className={`bg-red-400 text-red-400 w-6 ${channel?.status !== 'live' ? 'opacity-100' : 'opacity-25'}`}>_</span>
      <span className={`bg-green-400 text-green-400 w-6 ${channel?.status === 'live' ? 'opacity-100' : 'opacity-25'}`}>_</span>
    </div>
  )
}
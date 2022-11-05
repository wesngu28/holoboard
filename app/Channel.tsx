import Image, { StaticImageData } from 'next/image'
import { ChannelObj } from '../models/Channel'
import { getData } from '../utils/getData'
import { ClientComponentChannel } from './ClientComponentChannel'

interface Props {
  channel: ChannelObj
  image: StaticImageData
}

export async function Channel({ channel, image }: Props) {
  let data = await getData(channel.id)

  return <ClientComponentChannel channel={channel} image={image} ssrdata={data} />
}

"use client"

import channels from "../assets/holoen.json";
import { ChannelObj } from "../models/Channel";
import Image from "next/image";
import Livecols from "./LiveCols";
import useSWR from 'swr'
import { VideoStatus } from "../models/VideoStatus";
import { useImage } from "./imageArray";
import Link from "next/link";

export default function Chart() {
  const images = useImage
  const { data, error } = useSWR(
    'http://localhost:3000/api/tracker',
    async () => {
      const infos = await fetch('http://localhost:3000/api/tracker', { cache: "no-cache" });
      const infosJson: VideoStatus[] = await infos.json();
      return infosJson;
    },
    { refreshInterval: 90000 }
  );

  return (
    <main className="p-2 flex-1 flex flex-col items-center justify-center">
      <Link href={"/theater"}><p className="text-2xl font-semibold tracking-tight">Visit the Theater 🍿</p></Link>
      {
        !data ? <h2 className="text-lg font-semibold mt-4">Fetching data...</h2>
        : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
        : channels.map((channel: ChannelObj, i: number) =>
          {
            let channelData = data.filter(status => status.id === channel.id)[0]
            return (
              <a key={channel.id} href={channelData.video ? `https://www.youtube.com/watch?v=${channelData.video}`
                : `https://www.youtube.com/channel/${channel.id}`} target="_blank" rel="noreferrer">
                <div
                  className="min-w-[18rem] max-w-xs sm:max-w-sm mt-4 p-4 bg-white rounded-lg shadow flex flex-col justify-center">
                  <div className="flex justify-between w-full">
                    <p className="text-black">{channel.name}</p>
                    <div className="flex">
                    <Image src={images[i]} alt={channel.name} height={24} width={24} />
                    <Livecols channel={channelData} />
                    </div>
                  </div>
                </div>
              </a>
            )
          }
        )
      }
    </main>
  );
}

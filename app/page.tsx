"use client"

import { ChannelObj } from "../models/Channel";
import { VideoStatus } from "../models/VideoStatus";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import channels from "../assets/holoen.json";
import Livecols from "./LiveCols";

export default function Chart() {

  const { data, error } = useSWR("get lives",
    async () => {
      const infos = await fetch(`${process.env.SITE}/api/tracker`, { cache: "no-cache" });
      const infosJson: VideoStatus[] = await infos.json();
      return infosJson;
    },
    { refreshInterval: 90000 }
  );

  return (
    <main className="p-2 flex-1 flex flex-col items-center justify-center mb-10">
      <Link href={"/theater"}><p className="text-2xl font-semibold tracking-tight">Visit the Theater 🍿</p></Link>
      { !data ?
        <h2 className="text-lg font-semibold mt-8">Fetching data...</h2>
        : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
        : channels.map((channel: ChannelObj, i: number) => {
            let channelData = data.filter(status => status.id === channel.id)[0]
            return (
              <a key={channel.id} href={channelData.video ? `https://www.youtube.com/watch?v=${channelData.video}`
                : `https://www.youtube.com/channel/${channel.id}`} target="_blank" rel="noreferrer">
                <div
                  className="min-w-[18rem] max-w-xs sm:max-w-sm mt-4 p-4 bg-white rounded-lg shadow flex flex-col justify-center">
                  <div className="flex justify-between w-full">
                    <p className="text-black">{channel.name}</p>
                    <div className="flex">
                    <Image src={`/${channel.name}.jpg`} alt={channel.name} height={24} width={24} />
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

"use client"

import Image from "next/image";
import useSWR from "swr"
import onion from "../../public/onion.png"
import Header from "./Header";
export default function Onion() {

  const { data, error } = useSWR(
    'http://localhost:3000/api/onion',
    async () => {
      const infos = await fetch('http://localhost:3000/api/onion', { cache: "no-cache" });
      const infosJson = await infos.json();
      return infosJson;
    },
    { refreshInterval: 60000 }
  );
  return (
    <main className="p-2 min-h-screen flex-1 flex flex-col items-center bg-gradient-to-br from-[#FDC8EA] to-[#E99ED2]">
      <div className="max-w-xl flex flex-col items-center">
      <h1 className="text-[#865C79] text-6xl font-bold tracking-tight mt-4">Onion Season</h1>
        <Header />
        <a href="https://www.youtube.com/@MinatoAqua"><Image alt={"onion aqua maid"} src={onion} /></a>
        <div className="text-center text-[#865C79]">
          <p className="text-3xl tracking-tight font-semibold">Is Aqua Currently Live?</p>
          { data && data.status === 'offline' && <p>Aqua is not currently live, but you can watch her last stream!</p>}
          { data && data.status === 'live' && <p>Aqua is currently live, do not miss out!</p>}
          { data && data.status === 'upcoming' && <p>Aqua is will be live in {data.time}, do not miss out!</p>}
          { data &&
            <iframe
              className="min-w-[300px] w-[576px] h-[424.295999999px] min-h-[220.987499999px] mt-8"
              src={`https://www.youtube.com/embed/${data.video}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          }
          {data && ["live", "upcoming"].includes(data?.status) &&
          <iframe
            className="min-w-[300px] w-[576px] h-[424.295999999px] min-h-[220.987499999px]"
            src={`https://www.youtube.com/live_chat?v=${data.video}&embed_domain=localhost`}
            />
          }
        </div>
      </div>
    </main>
  );
}
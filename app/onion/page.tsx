"use client"

import Image from "next/image";
import useSWR from "swr"
import onion from "../../public/onion.png"
import Header from "./Header";
export default function Onion() {
  const { data, error } = useSWR('get aqua',
    async () => {
      const infos = await fetch(`${process.env.NEXT_PUBLIC_SITE}/api/onion`);
      const infosJson = await infos.json();
      return infosJson;
    },
    { refreshInterval: 1200000, revalidateOnFocus: false }
  );
  return (
    <main className="p-2 min-h-screen flex-1 flex flex-col items-center bg-gradient-to-br from-[#FDC8EA] to-[#E99ED2]">
      <div className="max-w-xl flex flex-col items-center">
        <h1 className="text-[#865C79] text-5xl font-bold tracking-tight mt-4 text-wrap">Akukin</h1>
        <Header />
        <a href="https://www.youtube.com/@MinatoAqua"><Image alt={"onion aqua maid"} src={onion} /></a>
        {!data ? <h2 className="text-lg font-semibold mt-4">Fetching data...</h2>
        : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
        : <div className="text-center text-[#865C79] flex flex-col items-center">
          <p className="text-3xl tracking-tight font-semibold">Is Aqua Currently Live?</p>
          { data && data.status === 'offline' && <p>Aqua is not currently live, but you can watch her last {data.type}!</p>}
          { data && data.status === 'live' && <p>Aqua is currently live, do not miss out!</p>}
          { data && data.status === 'upcoming' && <p>Aqua is will be live in {data.time}, do not miss out!</p>}
          { data &&
            <iframe
              className="sm:w-[576px] sm:h-[424.295999999px] w-[300px] h-[220.987499947] min-h-[220.987499999px] mt-8"
              src={`https://www.youtube.com/embed/${data.video}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          }
          {data && ["live", "upcoming"].includes(data?.status) &&
          <iframe
            className="sm:w-[576px] sm:h-[424.295999999px] w-[300px] h-[220.987499947]"
            src={`https://www.youtube.com/live_chat?v=${data.video}&embed_domain=${process.env.DOMAIN}`}
            />
          }
        </div>}
      </div>
    </main>
  );
}
"use client";

import useSWR from "swr";
import Link from "next/link";
import LicensedBar from "./Bar";
import { useState } from "react";
import GraphFilter from "./GraphFilter";
import { SubStatus } from "../../models/VideoStatus";

export default function Chart() {
  const [graphfilter, setGraphfilter] = useState("subs");
  const [groupfilter, setGroupfilter] = useState(new Set<string>(['Myth', 'CouncilRys', 'Tempus Wave 1', 'Tempus Wave 2']))
  const handleCheckBox = (newSet: Set<string>) => {
    setGroupfilter(newSet)
  }
  const handleGraphOptionChange = (newFilter: string) => {
    setGraphfilter(newFilter);
  };

  const { data, error } = useSWR(
    'http://localhost:3000/api/subs',
    async () => {
      const infos = await fetch('http://localhost:3000/api/subs', { cache: "no-cache" });
      const infosJson: SubStatus[] = await infos.json();
      return infosJson;
    },
    { refreshInterval: 60000 }
  );

  return (
    <main className="p-2 min-h-screen flex-1 flex flex-col items-center justify-center">
      <Link href={"/"}>
        <p className="text-2xl font-semibold tracking-tight">
          Visit the Theater 🍿
        </p>
      </Link>
      {!data ? <h2 className="text-lg font-semibold mt-4">Fetching data...</h2>
      : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
      : <div className="max-w-2xl">
        <GraphFilter onChange={handleGraphOptionChange} onCheckBox={handleCheckBox} setProp={groupfilter}/>
        <div className="h-[1250px] max-w-3xl mt-4 p-4 bg-gray-900 rounded-lg shadow flex flex-col justify-center">
          <LicensedBar
            filter={graphfilter}
            datas={
              data.filter(channel => groupfilter.has(channel.group)).
              sort((a, b) => {
              switch (graphfilter) {
                case "video_count":
                  return b.video_count - a.video_count;
                case "view_count":
                  return b.view_count - a.view_count;
                default:
                  return b.subs - a.subs;
              }
            })}
          />
        </div>
      </div>}
    </main>
  );
}

"use client";

import useSWR from "swr";
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

  const { data, error } = useSWR('get subs',
    async () => {
      const infos = await fetch(`${process.env.NEXT_PUBLIC_SITE}/api/subs`, {
        cache: "no-store",
      });
      const infosJson: SubStatus[] = await infos.json();
      console.log(infosJson)
      return infosJson;
    },
    { refreshInterval: 43200000, revalidateOnFocus: false }
  );

  return (
    <main className="p-2 min-h-screen flex-1 flex flex-col items-center justify-center">
      {!data ? <h2 className="text-lg font-semibold mt-4">Fetching data...</h2>
      : error ? <h2 className="text-lg font-semibold mt-4">Failed to fetch information</h2>
      : <div className="w-full sm:max-w-xl lg:max-w-3xl xl:max-w-6xl">
        <GraphFilter onChange={handleGraphOptionChange} onCheckBox={handleCheckBox} setProp={groupfilter}/>
        <div className="h-[1250px] mt-4 p-4 bg-gray-900 rounded-lg shadow flex flex-col justify-center relative">
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

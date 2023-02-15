"use client";

import useSWR from "swr";
import Link from "next/link";
import LicensedBar from "./Bar";
import { useState } from "react";
import GraphFilter from "./GraphFilter";

export default function Chart() {
  const [graphfilter, setGraphfilter] = useState("subs");
  const [groupfilter, setGroupfilter] = useState(new Set<string>(['Myth', 'CouncilRys', 'Tempus Wave 1', 'Tempus Wave 2']))
  const handleCheckBox = (newSet: Set<string>) => {
    setGroupfilter(newSet)
  }
  const handleGraphOptionChange = (newFilter: string) => {
    setGraphfilter(newFilter);
  };
  const data = [{"id":"UCyl1z3jo3XHR1riLFKG5UAg","name":"Amelia Watson","group":"Myth","thumbnail":"https://yt3.ggpht.com/RZ4Fp3L6_zyq6YA7s5WnH8-22iezMLwdJhtkBgs_EAb06mvMCnF59JKMNu9YPCqb7nhaeXMdPvY=s88-c-k-c0x00ffffff-no-rj","color":"rgb(242,218,194)","subs":1730000,"view_count":150854129,"video_count":760},{"id":"UCL_qhgtOy0dy1Agp8vkySQg","name":"Mori Calliope","group":"Myth","thumbnail":"https://yt3.ggpht.com/8B_T08sx8R7XVi5Mwx_l9sjQm5FGWGspeujSvVDvd80Zyr-3VvVTRGVLOnBrqNRxZp6ZeXAV=s88-c-k-c0x00ffffff-no-nd-rj","color":"rgb(243,214,214)","subs":2190000,"view_count":411276255,"video_count":672},{"id":"UCoSrY_IQQVpmIRZ9Xf-y93g","name":"Gawr Gura","group":"Myth","thumbnail":"https://yt3.ggpht.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s88-c-k-c0x00ffffff-no-rj","color":"rgb(239,239,240)","subs":4270000,"view_count":331326402,"video_count":456},{"id":"UCMwGHR0BTZuLsmjY_NT5Pwg","name":"Ninomae Ina'nis","group":"Myth","thumbnail":"https://yt3.ggpht.com/f4uYWHJxiGwyXm8NUlm818N1MRnywtgL6wM8JdWqWsKBzI7v1eg8dxDWG7igkWuukUSiufydqPg=s88-c-k-c0x00ffffff-no-rj","color":"rgb(255,254,255)","subs":1500000,"view_count":117813591,"video_count":513},{"id":"UCHsx4Hqa-1ORjQTh9TYDhww","name":"Takanashi Kiara","group":"Myth","thumbnail":"https://yt3.ggpht.com/w7TKJYU7zmamFmf-WxfahCo_K7Bg2__Pk-CCBNnbewMG-77OZLqJO9MLvDAmH9nEkZH8OkWgSQ=s88-c-k-c0x00ffffff-no-nd-rj","color":"rgb(254,240,240)","subs":1450000,"view_count":167899610,"video_count":783},{"id":"UC8rcEBzJSleTkf_-agPM20g","name":"IRyS","group":"CouncilRys","thumbnail":"https://yt3.ggpht.com/oC30wBZ04ibFN7AQVHAjdUX-3nS-h4DDjJBYVlsKt0OF6t1CZwrgzWlr3rS6Q12kXrw3-mt9gg=s88-c-k-c0x00ffffff-no-nd-rj","color":"rgb(236,166,147)","subs":912000,"view_count":69358743,"video_count":301},{"id":"UCgmPnx-EEeOrZSg5Tiw7ZRQ","name":"Hakos Baelz","group":"CouncilRys","thumbnail":"https://yt3.ggpht.com/7gFSRIM3_DhczV8AYjeP4EaS0OL-u_xLvIh9JhG9zJhPYEfVwsoUOK61L6eBlLjnPHN-EDvytQ=s88-c-k-c0x00ffffff-no-rj","color":"rgb(144,5,17)","subs":682000,"view_count":59134324,"video_count":410},{"id":"UCO_aKKYxn4tvrqPjcTzZ6EQ","name":"Ceres Fauna","group":"CouncilRys","thumbnail":"https://yt3.ggpht.com/cBtserkb211p6If2OewgWd8oriIKRkfwTcP4_Vdq2YETG5TK9Q02v4cYmnLU03KBAJ0gcDha7oQ=s88-c-k-c0x00ffffff-no-rj","color":"rgb(255,246,237)","subs":687000,"view_count":64238487,"video_count":330},{"id":"UCmbs8T6MWqUHP1tIQvSgKrg","name":"Ouro Kronii","group":"CouncilRys","thumbnail":"https://yt3.ggpht.com/ntCVYU9_M3j3G_lYEKTaBsIRmB2ZA1W6uu3n7bHCwaT2HvzqL1t5ABhGaZ3ucfm1yP3-9hFQuw=s88-c-k-c0x00ffffff-no-rj","color":"rgb(91,96,123)","subs":844000,"view_count":50254945,"video_count":250},{"id":"UC3n5uGu18FoCy23ggWWp8tA","name":"Nanashi Mumei","group":"CouncilRys","thumbnail":"https://yt3.ggpht.com/owZmjfnG_SGVmfkl3eS7Lv47pGvIr2SrS36imh6O8i0H3Wy41fYKD26U7wnyRB627fXoq0aQ0Q=s88-c-k-c0x00ffffff-no-rj","color":"rgb(172,138,122)","subs":780000,"view_count":61185741,"video_count":314},{"id":"UCsUj0dszADCGbF3gNrQEuSQ","name":"Tsukomo Sana","group":"CouncilRys","thumbnail":"https://yt3.ggpht.com/zczPLp_sj4Qq3CyoGzfXifOdwE7aMHRpUdqbMD9UKvjddBG2NdMrCKElCMUOS6x85BMr2VGuAA=s88-c-k-c0x00ffffff-no-rj","color":"rgb(230,140,117)","subs":398000,"view_count":15047207,"video_count":106},{"id":"UCyxtGMdWlURZ30WSnEjDOQw","name":"Regis Altare","group":"Tempus Wave 1","thumbnail":"https://yt3.ggpht.com/pZD_QHSP7ctIgipDz-fOMJcknud5odVSDT4nBAHNTXB6Q-EwvU30bHWMXSOF-lmuqbZQHmFd=s88-c-k-c0x00ffffff-no-rj","color":"rgb(25,19,16)","subs":234000,"view_count":8049130,"video_count":215},{"id":"UC2hx0xVkMoHGWijwr_lA01w","name":"Axel Syrios","group":"Tempus Wave 1","thumbnail":"https://yt3.ggpht.com/BcfKD35tQ053FmocAwANErU1pqdCeU0Eri4i0OOWe3whPDOUUhz-7mQs0oE9jNROdC2kODIn3w=s88-c-k-c0x00ffffff-no-rj","color":"rgb(26,21,29)","subs":188000,"view_count":7813272,"video_count":185},{"id":"UC7MMNHR-kf9EN1rXiesMTMw","name":"Magni Dezmond","group":"Tempus Wave 1","thumbnail":"https://yt3.ggpht.com/2wjE3HijJ3UV60HTi8rG-sgDHLVxEWaGl8TJyVYdAmJ_razbmxvwN5zuf4NP2eDDK5YmeU3spw=s88-c-k-c0x00ffffff-no-rj","color":"rgb(248,224,216)","subs":194000,"view_count":8130352,"video_count":164},{"id":"UCDRWSO281bIHYVi-OV3iFYA","name":"Noir Vesper","group":"Tempus Wave 1","thumbnail":"https://yt3.ggpht.com/EzGR0TGwFiV5CFt2nrKSzL7RFxLOaYQXIBVCj2FXaN-aHv0nhM1D1VaP4Eg7Xj8Cc-ltrRqG=s88-c-k-c0x00ffffff-no-rj","color":"rgb(167,94,93)","subs":204000,"view_count":7670212,"video_count":171},{"id":"UCHP4f7G2dWD4qib7BMatGAw","name":"Gavis Bettel","group":"Tempus Wave 2","thumbnail":"https://yt3.ggpht.com/KCOi00Trc1KOPpHdwlkQiktd4ejGi7meB7A5kaoTjitcTDo1A10b3c-68L0VfnIvKoEMj6yY=s88-c-k-c0x00ffffff-no-rj","color":"rgb(141,53,123)","subs":94900,"view_count":1747883,"video_count":46},{"id":"UC060r4zABV18vcahAWR1n7w","name":"Machina X Flayon","group":"Tempus Wave 2","thumbnail":"https://yt3.ggpht.com/4_CFVqKaaM7_qrWwzIvVAhevS1i4fP4GfjPULgZXzFCIh9ga6jYeUq6ySqsBCh7u3q5tNj1Tcw=s88-c-k-c0x00ffffff-no-rj","color":"rgb(218,62,51)","subs":89100,"view_count":1371249,"video_count":58},{"id":"UC7gxU6NXjKF1LrgOddPzgTw","name":"Banzoin Hakka","group":"Tempus Wave 2","thumbnail":"https://yt3.ggpht.com/cgq7GevjPwVIuZcjDBvSF5JlnJJLo2RRpVHTWNF0lxLSGAsaScy1k931WGhJSg74lsCs7UbNlA=s88-c-k-c0x00ffffff-no-rj","color":"rgb(209,168,247)","subs":94100,"view_count":1488993,"video_count":51},{"id":"UCMqGG8BRAiI1lJfKOpETM_w","name":"Josuiji Shinri","group":"Tempus Wave 2","thumbnail":"https://yt3.ggpht.com/dfezjBBjUFLzo8J7IF0zJ3cYQ3c9JdaJMHdD_2h62qzQXve602lyv5LjkRv2QaCTB2Ibg6NA5w=s88-c-k-c0x00ffffff-no-rj","color":"rgb(50,47,46)","subs":84300,"view_count":1432223,"video_count":70}]
  // const { data, error } = useSWR(
  //   'http://localhost:3000/api/subs',
  //   async () => {
  //     const infos = await fetch('http://localhost:3000/api/subs', { cache: "no-cache" });
  //     const infosJson: SubStatus[] = await infos.json();
  //     return infosJson;
  //   },
  //   { refreshInterval: 60000 }
  // );
  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  return (
    <main className="p-2 min-h-screen flex-1 flex flex-col items-center justify-center">
      <Link href={"/"}>
        <p className="text-2xl font-semibold tracking-tight">
          Visit the Theater 🍿
        </p>
      </Link>
      <div className="max-w-2xl">
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
      </div>
    </main>
  );
}

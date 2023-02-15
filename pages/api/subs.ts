import { NextApiRequest, NextApiResponse } from "next";
import { CronJob } from "cron";
import { client } from "./client";
import { getAverageColor } from "fast-average-color-node";

export interface SubStatus {
  id: string;
  name: string,
  group: string,
  thumbnail: string;
  color: string;
  subs: number;
  view_count: number;
  video_count: number;
}

const ids: SubStatus[] = [
  { id: "UCyl1z3jo3XHR1riLFKG5UAg", name: "Amelia Watson", group: "Myth", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCL_qhgtOy0dy1Agp8vkySQg", name: "Mori Calliope", group: "Myth", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCoSrY_IQQVpmIRZ9Xf-y93g", name: "Gawr Gura", group: "Myth", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCMwGHR0BTZuLsmjY_NT5Pwg", name: "Ninomae Ina'nis", group: "Myth", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCHsx4Hqa-1ORjQTh9TYDhww", name: "Takanashi Kiara", group: "Myth", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UC8rcEBzJSleTkf_-agPM20g", name: "IRyS", group: "CouncilRys", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCgmPnx-EEeOrZSg5Tiw7ZRQ", name: "Hakos Baelz", group: "CouncilRys", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCO_aKKYxn4tvrqPjcTzZ6EQ", name: "Ceres Fauna", group: "CouncilRys", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCmbs8T6MWqUHP1tIQvSgKrg", name: "Ouro Kronii", group: "CouncilRys", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UC3n5uGu18FoCy23ggWWp8tA", name: "Nanashi Mumei", group: "CouncilRys", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCsUj0dszADCGbF3gNrQEuSQ", name: "Tsukomo Sana", group: "CouncilRys", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCyxtGMdWlURZ30WSnEjDOQw", name: "Regis Altare", group: "Tempus Wave 1", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UC2hx0xVkMoHGWijwr_lA01w", name: "Axel Syrios", group: "Tempus Wave 1", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UC7MMNHR-kf9EN1rXiesMTMw", name: "Magni Dezmond", group: "Tempus Wave 1", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCDRWSO281bIHYVi-OV3iFYA", name: "Noir Vesper", group: "Tempus Wave 1", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCHP4f7G2dWD4qib7BMatGAw", name: "Gavis Bettel", group: "Tempus Wave 2", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UC060r4zABV18vcahAWR1n7w", name: "Machina X Flayon", group: "Tempus Wave 2", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UC7gxU6NXjKF1LrgOddPzgTw", name: "Banzoin Hakka", group: "Tempus Wave 2", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
  { id: "UCMqGG8BRAiI1lJfKOpETM_w", name: "Josuiji Shinri", group: "Tempus Wave 2", thumbnail: "", color: "", subs: 0, view_count: 0, video_count: 0 },
];

async function iterateAndUpdate() {
  for (const id of ids) {
    try {
      const liveUpcomingVideos = await client.getChannel(id.id)
      if (!id.thumbnail) {
        id.thumbnail = liveUpcomingVideos.avatarUrl.replace('800', '88')
        const dominant = await getAverageColor(id.thumbnail.replace('-c-k-c0x00ffffff-no-rj', ''), { algorithm: 'simple' })
        id.color = dominant.rgb
      }
      id.subs = liveUpcomingVideos.subscriberCount;
      id.view_count = liveUpcomingVideos.viewCount;
      id.video_count = liveUpcomingVideos.videoCount;
    } catch (err) {
      console.log(`Error of ${err} with ${id.id} while getting channel information`);
    }
  }
}

// async function startCron() {
//   await iterateAndUpdate()
//   job.start()
// }

// const job = new CronJob("0 0 0 * * *", async () => {
//   await iterateAndUpdate()
// });

// startCron()

let clients: { [key: string]: number } = {};
const liveData = (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.socket.remoteAddress;
  if (!ip) return;
  if (!clients[ip] || clients[ip] < 50) {
    clients[ip] = clients[ip] ? clients[ip] + 1 : 1;
    res.status(200).json(ids);
  } else {
    res.status(429).send("Too many requests. Please try again later.");
  }
  setTimeout(() => {
    clients = {};
  }, 60000);
};

export default liveData;

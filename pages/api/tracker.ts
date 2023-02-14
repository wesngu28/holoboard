import { NextApiRequest, NextApiResponse } from "next";
import { CronJob } from "cron";
import { client } from "./client";
// Cannot access ambient const enums when the '--isolatedModules' flag is provided.
export interface VideoStatus {
  id: string;
  status: string;
  video: string;
  time?: string;
}

const ids: VideoStatus[] = [
  { id: "UCyl1z3jo3XHR1riLFKG5UAg", status: "", video: "", time: "" },
  { id: "UCL_qhgtOy0dy1Agp8vkySQg", status: "", video: "", time: "" },
  { id: "UCoSrY_IQQVpmIRZ9Xf-y93g", status: "", video: "", time: "" },
  { id: "UCMwGHR0BTZuLsmjY_NT5Pwg", status: "", video: "", time: "" },
  { id: "UCHsx4Hqa-1ORjQTh9TYDhww", status: "", video: "", time: "" },
  { id: "UC8rcEBzJSleTkf_-agPM20g", status: "", video: "", time: "" },
  { id: "UCgmPnx-EEeOrZSg5Tiw7ZRQ", status: "", video: "", time: "" },
  { id: "UCO_aKKYxn4tvrqPjcTzZ6EQ", status: "", video: "", time: "" },
  { id: "UCmbs8T6MWqUHP1tIQvSgKrg", status: "", video: "", time: "" },
  { id: "UC3n5uGu18FoCy23ggWWp8tA", status: "", video: "", time: "" },
  { id: "UCsUj0dszADCGbF3gNrQEuSQ", status: "", video: "", time: "" },
  { id: "UCyxtGMdWlURZ30WSnEjDOQw", status: "", video: "", time: "" },
  { id: "UC2hx0xVkMoHGWijwr_lA01w", status: "", video: "", time: "" },
  { id: "UC7MMNHR-kf9EN1rXiesMTMw", status: "", video: "", time: "" },
  { id: "UCDRWSO281bIHYVi-OV3iFYA", status: "", video: "", time: "" },
  { id: "UCHP4f7G2dWD4qib7BMatGAw", status: "", video: "", time: "" },
  { id: "UC060r4zABV18vcahAWR1n7w", status: "", video: "", time: "" },
  { id: "UC7gxU6NXjKF1LrgOddPzgTw", status: "", video: "", time: "" },
  { id: "UCMqGG8BRAiI1lJfKOpETM_w", status: "", video: "", time: "" },
];

export const getNearestStream = async (id: string) => {
  try {
    const response = await fetch(
      `https://holodex.net/api/v2/videos?channel_id=${id}&status=upcoming&type=stream&max_upcoming_hours=48`,
      {
        cache: "no-store",
        headers: {
          "x-api-key": process.env.HOLODEX_API!,
        },
      }
    );
    const getNearestStreamJson = await response.json();
    if (getNearestStreamJson[0]) {
      const nextStream = getNearestStreamJson[getNearestStreamJson.length - 1];
      const dater = new Date(nextStream.available_at);
      let timeUntil = (dater.getTime() - Date.now()) / 1000;
      let humanReadable = "";
      const days = Math.floor(timeUntil / 86400);
      timeUntil %= 86400;
      const hours = Math.floor(timeUntil / 3600);
      timeUntil %= 3600;
      const minutes = Math.floor(timeUntil / 60);
      timeUntil %= 60;
      const seconds = Math.floor(timeUntil);
      if (days > 0) humanReadable += `${days} days `;
      if (hours > 0) humanReadable += `${hours} hours `;
      if (minutes > 0) humanReadable += `${minutes} minutes `;
      if (seconds > 0) humanReadable += `${seconds} seconds `;
      humanReadable += "until next stream";
      return { video: nextStream.id, time: humanReadable };
    }
  } catch (err) {
    console.log("Error getting next stream for " + id);
  }
};

export const getLastVideo = async (id: string) => {
  try {
    const latestVideo = await fetch(
      `https://holodex.net/api/v2/videos?channel_id=${id}&status=past&type=stream`,
      {
        cache: "no-store",
        headers: {
          "x-api-key": process.env.HOLODEX_API!,
        },
      }
    );
    const latestVideoJson = await latestVideo.json();
    return latestVideoJson[0].id;
  } catch (err) {
    console.log("Error getting last video for " + id);
  }
};

async function iterateAndUpdate() {
  const queryLiveIds = ids.map(channel => channel.id)
  const liveUpcomingVideos = await client.getLiveVideosByChannelId(queryLiveIds)
  for (const id of ids) {
    const thisLiveUpcoming = liveUpcomingVideos.filter(videos => videos.channelId === id.id)
    const hasLiveStatus = thisLiveUpcoming.find(video => video.status === 'live');
    let finished = false;
    while (!finished) {
      if (hasLiveStatus) {
        id.status = "live";
        id.video = hasLiveStatus.videoId;
        console.log("successfully got " + id.id + " with live");
        finished = true
      }
      try {
        const checkUpcoming = await getNearestStream(id.id);
        if (checkUpcoming) {
          id.status = "upcoming";
          id.video = checkUpcoming.video;
          id.time = checkUpcoming.time;
          console.log("successfully got " + id.id + " with upcoming");
          finished = true
        }
      } catch (err) {
        console.log(
          `Error of ${err} with ${id.id} while getting upcoming stream`
        );
      }
      try {
        const lastVideo = await getLastVideo(id.id);
        if (lastVideo) {
          id.status = "offline";
          id.video = lastVideo;
          console.log("successfully got " + id.id + " with last");
          finished = true
        }
      } catch (err) {
        console.log(`Error of ${err} with ${id.id} while getting last video`);
      }
    }
  }
}

// async function startCron() {
//   await iterateAndUpdate();
//   job.start();
// }

// const job = new CronJob("0 0/15 * * * *", async () => {
//   await iterateAndUpdate();
// });

// startCron();

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

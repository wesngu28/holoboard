import { NextApiRequest, NextApiResponse } from "next";
import { CronJob } from "cron";
import { client } from "./client";
import { getLastVideo, getNearestStream } from "./tracker";

const akutan = { id: "UC1opHUrw8rvnsadT-iGp7Cg", status: "", video: "", time: "" }

async function iterateAndUpdate() {
  const liveUpcomingVideos = await client.getLiveVideosByChannelId([akutan.id])
  const thisLiveUpcoming = liveUpcomingVideos.filter(videos => videos.channelId === akutan.id)
  const hasLiveStatus = thisLiveUpcoming.find(video => video.status === 'live');
  if (hasLiveStatus) {
    akutan.status = "live";
    akutan.video = hasLiveStatus.videoId;
    return
  }
  const checkUpcoming = await getNearestStream(akutan.id);
  if (checkUpcoming) {
    akutan.status = "upcoming";
    akutan.video = checkUpcoming.video;
    akutan.time = checkUpcoming.time;
    return
  }
  const lastVideo = await getLastVideo(akutan.id);
  if (lastVideo) {
    akutan.status = "offline";
    akutan.video = lastVideo;
    return
  }
  return

}

async function startCron() {
  await iterateAndUpdate();
  job.start();
}

const job = new CronJob("0 0/15 * * * *", async () => {
  await iterateAndUpdate();
});

startCron();

const liveData = async (req: NextApiRequest, res: NextApiResponse) => {
  await iterateAndUpdate()
  res.status(200).json(akutan)
};

export default liveData;

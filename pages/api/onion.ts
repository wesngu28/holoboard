import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./client";
import { getLastVideo, getNearestStream } from "./tracker";

async function farm_onions() {
  try {
    const akutan = { id: "UC1opHUrw8rvnsadT-iGp7Cg", status: "", video: "", time: "", type: "stream" }
    const liveUpcomingVideos = await client.getLiveVideosByChannelId([akutan.id])
    const thisLiveUpcoming = liveUpcomingVideos.filter(videos => videos.channelId === akutan.id)
    const hasLiveStatus = thisLiveUpcoming.find(video => video.status === 'live');
    if (hasLiveStatus) {
      akutan.status = "live";
      akutan.video = hasLiveStatus.videoId;
      return akutan;
    }
    const checkUpcoming = await getNearestStream(akutan.id);
    if (checkUpcoming) {
      akutan.status = "upcoming";
      akutan.video = checkUpcoming.video;
      akutan.time = checkUpcoming.time;
      return akutan;
    }
    const lastVideo = await getLastVideo(akutan.id);
    if (lastVideo) {
      akutan.status = "offline";
      akutan.video = lastVideo;
      akutan.type = "video";
      return akutan;
    }
  } catch (error) {
    console.log(`Error occurred while updating akutan: ${error}`);
  }
}

const liveData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(await farm_onions());
  } catch(err) {
    res.status(500).send("Failed to load data");
  }
};
export default liveData;

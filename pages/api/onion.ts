import { NextApiRequest, NextApiResponse } from "next";
import { getLastVideo, getNearestStream } from "./tracker";

async function farm_onions() {
  try {
    const akutan = { id: "UC1opHUrw8rvnsadT-iGp7Cg", status: "", video: "", time: "", type: "stream" }
    const liveUpcomingVideos = await fetch(`https://holodex.net/api/v2/channels/${akutan.id}/videos`, {
      headers: {
        "X-APIKEY": process.env.HOLODEX_API!
      }
    })
    const lives: Array<any> = await liveUpcomingVideos.json()
    const thisLiveUpcoming = lives.filter(videos => videos.channel.id === akutan.id)
    const hasLiveStatus = thisLiveUpcoming.find(video => {
      return video.status === 'live'
    });
    if (hasLiveStatus) {
      akutan.status = "live";
      akutan.video = hasLiveStatus.video_id;
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
    console.log(lastVideo)
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

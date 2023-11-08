import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./client";
import db from "../../assets/db.json"
import { getAverageColor } from "fast-average-color-node";

async function getSubData() {
  try {
    const promises = db.map(channel => client.getChannel(channel.id));
    const liveUpcomingVideos = await Promise.all(promises);
    liveUpcomingVideos.forEach( async (live, index) => {
      try {
        db[index].subs = live.subscriberCount;
        db[index].view_count = live.viewCount;
        db[index].video_count = live.videoCount;
        if (!db[index].thumbnail) {
          db[index].thumbnail = live.avatarUrl.replace('800', '88')
          const dominant = await getAverageColor(db[index].thumbnail.replace('-c-k-c0x00ffffff-no-rj', ''), { algorithm: 'simple' })
          db[index].color = dominant.rgb
        }
      } catch(err) {
        console.log(`Error of ${err} with ${db[index].name} while getting channel information`);
      }
    });
  } catch (err) {
    console.log(err)
  }
  return db
}

const liveData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(await getSubData());
  } catch(err) {
    res.status(500).send("Failed to load data");
  }
};

export default liveData;

import { NextApiRequest, NextApiResponse } from "next";
import { client } from "./client";
import db from "../../assets/db.json"

async function getSubData() {
  try {
    const promises = db.map(channel => client.getChannel(channel.id));
    const liveUpcomingVideos = await Promise.all(promises);
    liveUpcomingVideos.forEach((live, index) => {
      try {
        db[index].subs = live.subscriberCount;
        db[index].view_count = live.viewCount;
        db[index].video_count = live.videoCount;
      } catch(err) {
        console.log(`Error of ${err} with ${db[index].name} while getting channel information`);
      }
    });
  } catch (err) {
    console.log('Error with getting sub data')
  }
  return db
}
// if (!id.thumbnail) {
//   id.thumbnail = liveUpcomingVideos.avatarUrl.replace('800', '88')
//   const dominant = await getAverageColor(id.thumbnail.replace('-c-k-c0x00ffffff-no-rj', ''), { algorithm: 'simple' })
//   id.color = dominant.rgb
// }
const liveData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(await getSubData());
  } catch(err) {
    res.status(500).send("Failed to load data");
  }
};

export default liveData;

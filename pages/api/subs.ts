import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../assets/db.json'
import { getAverageColor } from 'fast-average-color-node'

async function getSubData() {
  try {
    const promises = db.map(async channel => {
      const liveUpcomingVideos = await fetch(`https://holodex.net/api/v2/channels/${channel.id}`, {
        headers: {
          'X-APIKEY': process.env.HOLODEX_API!,
        },
      })
      return await liveUpcomingVideos.json()
    })
    const liveUpcomingVideos = await Promise.all(promises)
    liveUpcomingVideos.forEach(async (live, index) => {
      try {
        db[index].subs = live.subscriber_count
        db[index].view_count = live.view_count
        db[index].video_count = live.video_count
        if (!db[index].thumbnail) {
          db[index].thumbnail = live.avatarUrl.replace('800', '88')
          const dominant = await getAverageColor(db[index].thumbnail.replace('-c-k-c0x00ffffff-no-rj', ''), {
            algorithm: 'simple',
          })
          db[index].color = dominant.rgb
        }
      } catch (err) {
        console.log(`Error of ${err} with ${db[index].name} while getting channel information`)
      }
    })
  } catch (err) {
    console.log(err)
  }
  return db
}

const liveData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json(await getSubData())
  } catch (err) {
    res.status(500).send('Failed to load data')
  }
}

export default liveData

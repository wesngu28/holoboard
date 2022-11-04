import { ChannelObj } from "../models/Channel";
import channels from "../assets/holoen.json"
import ame from '../public/amelia.jpg'
import calli from '../public/calliope.jpg'
import gura from '../public/gura.jpg'
import ina from '../public/ina.jpg'
import kiara from '../public/kiara.jpg'
import irys from '../public/irys.jpg'
import bae from '../public/bae.jpg'
import fauna from '../public/fauna.jpg'
import kronii from '../public/kronii.jpg'
import mumei from '../public/mumei.jpg'
import sana from '../public/sana.jpg'
import altare from '../public/regis.jpg'
import axel from '../public/axel.jpg'
import dez from '../public/magni.jpg'
import vesper from '../public/vesper.jpg'
import { Channel } from "./Channel";

export function Channels() {
    const images = [ame, calli, gura, ina, kiara, irys, bae, fauna, kronii, mumei, sana, altare, axel, dez, vesper]

    return (
        <div className={`flex items-center justify-center flex-wrap absolute bottom-4`}>
            {channels.map((channel: ChannelObj, i: number) => (
                {/* @ts-expect-error Server Component */}
                <Channel key={channel.id} channel={channel} image={images[i]}/>
            ))}
        </div>
    );

}
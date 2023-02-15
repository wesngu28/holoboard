import Image from "next/image";
import popcorn from "../../public/popcorn.png"
import music from "../../public/music.png"

export default function Header() {
  return (
    <div className="flex justify-center mt-8">
      <a href="/onion"><Image alt="popcorn" className="w-1/2 m-auto" src={popcorn} /></a>
      <a href="/onion/music"><Image alt="music note" className="w-1/2 m-auto" src={music} /></a>
    </div>
  )
}
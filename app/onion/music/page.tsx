"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import akukin from "../../../assets/aqua.json"
import Header from "../Header";

interface Playlist {name: string,
  songs: {
    name: string;
    duration: string;
    year: string;
    link: string;
    art: boolean;
    yt?: string | undefined;
}[]}

export default function Onion() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currSong, setCurrSong] = useState<string>("https://dl.dropbox.com/s/wtui91shtwtfwbb/%E3%83%AA%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC%E3%83%93%E3%83%BC%E3%83%882%20%40%20%E3%83%95%E3%83%AA%E3%83%BCBGM%20DOVA-SYNDROME%20OFFICIAL%20YouTube%20CHANNEL.mp3")
  const [playlist, setPlaylist] = useState({"name": "", "songs": []} as Playlist)
  const [art, setArt] = useState('/Ateshi.webp')
  const toggleAudio = (mp3: string) => {
    if (audioRef.current !== null) {
      new Promise<void>((resolve) => {
        resolve(setCurrSong(mp3));
      }).then(() => audioRef.current!.play());
    }
  };

  return (
    <main className="p-2 min-h-screen flex-1 flex flex-col items-center bg-gradient-to-br from-[#FDC8EA] to-[#E99ED2]">
      <div className="max-w-md flex flex-col items-center">
      <h1 className="text-[#865C79] text-6xl font-bold tracking-tight mt-4">Onion Season</h1>
      <Header />
      <Image alt="Art of currently playing song" className="mt-8" src={`${art}`} width={576} height={576} />
        <div>
          <audio ref={audioRef} src={currSong} className="w-full" controls />
          <table className=" mb-4 table w-full text-left bg-[#6D5B7B] bg-opacity-75 max-w-[448px]">
            <thead className="bg-[#6D5B7B]">
              <tr>
                <th className="p-4 m-2 font-normal">Song Name</th>
                <th className="p-4 m-2 font-normal">Time</th>
                <th className="p-4 m-2 font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map(song =>
                <tr key={song.name} className="p-4 m-2 hover:bg-[#786587] truncate">
                  <td className="p-4 m-2 w-full break-normal whitespace-normal">
                    <button className="w-full text-left" onClick={() => {
                      toggleAudio(song.link)
                      song.art ? setArt(`/${song.name.replace(' (Instrumental)', '')}.webp`) : setArt(`/${playlist.name.replace(' (Instrumental)', '')}.webp`)
                    }}>{song.name}</button>
                  </td>
                  <td className="p-4 m-2 w-8">{song.duration}</td>
                  <td className="p-4 m-2 w-8  break-normal whitespace-normal">{song.year}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-full grid grid-cols-2 gap-16 text-[#FCFCFC] text-lg font-thin tracking-tight mb-20">
            {akukin.map(album =>
              <button onClick={() => {
                  if(album.songs !== playlist.songs) {
                    setPlaylist({name: album.name, songs: album.songs})
                    audioRef.current?.pause()
                    audioRef.current!.src = '';
                    audioRef.current?.load()
                    setArt(`/${album.name}.webp`)
                  }}
                } className="flex-col hover:cursor-pointer" key={album.name}>
                <Image alt={`${album.name}`} src={`/${album.name}.webp`} width={256} height={256} />
                <div className="flex w-full justify-between mt-2">
                  <p className="truncate">{album.name}</p>
                  <p>{album.date}</p>
                 </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
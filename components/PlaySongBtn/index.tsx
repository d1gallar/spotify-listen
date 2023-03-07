"use client";

import Image from "next/image";
import { usePlayback } from "@/hooks/Playback";

export default function PlaySongBtn() {
  const { isPlaying, handlePlayPause } = usePlayback();

  return (
    <button
      className="bg-white rounded-[32px] flex flex-row justify-center items-center w-8 h-8 scale-100 hover:scale-105 active:scale-[98%]"
      onClick={handlePlayPause}
    >
      {isPlaying ? (
        <Image
          src="/images/black-song-pause-icon.svg"
          width={16}
          height={16}
          alt="Pause Song Icon"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/black-song-play-icon.svg"
          width={16}
          height={16}
          alt="Play Song Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

"use client";

import Image from "next/image";
import { usePlayback } from "@/hooks/Playback";
import "./RepeatSongBtn.css";

// Note: not connected!
export default function RepeatSongBtn() {
  const { repeatIndex, handleRepeat } = usePlayback();

  return (
    <button
      className={`relative flex flex-row justify-center items-center w-8 h-8 min-w-8 max-w-8 border-none bg-transparent ${
        repeatIndex === 0
          ? "opacity-80 hover:opacity-100"
          : "green-circle opacity-90 hover:opacity-100"
      }`}
      onClick={handleRepeat}
    >
      {repeatIndex === 0 && (
        <Image
          src="/images/white-loop-init-icon.svg"
          width={16}
          height={16}
          alt="Loop Icon"
          draggable={false}
        />
      )}
      {repeatIndex === 1 && (
        <Image
          src="/images/green-loop-init-icon.svg"
          width={16}
          height={16}
          alt="Loop Icon"
          draggable={false}
        />
      )}
      {repeatIndex === 2 && (
        <Image
          src="/images/green-loop-repeat-icon.svg"
          width={16}
          height={16}
          alt="Loop Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

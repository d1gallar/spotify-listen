import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { usePlayback } from "@/hooks/Playback";
import "./VolumeControl.css";

export type VolumeType = "mute" | "low" | "mid" | "max";

const LOW_VOLUME_MAX = 30;
const MID_VOLUME_MAX = 80;

export default function VolumeControl() {
  const { setVolume, volume, isMuted, handleMute, setIsMuted } = usePlayback();
  const [volumeType, setVolumeType] = useState<VolumeType>("mid");

  const changeVolumeType = (volumeFloat: number) => {
    if (volumeFloat <= 1) {
      setVolumeType("mute");
      setIsMuted(true);
      setVolume(0);
    } else if (volumeFloat > 0 && volumeFloat < LOW_VOLUME_MAX) {
      setVolumeType("low");
      setIsMuted(false);
    } else if (volumeFloat > LOW_VOLUME_MAX && volumeFloat < MID_VOLUME_MAX) {
      setVolumeType("mid");
      setIsMuted(false);
    } else if (volumeFloat > MID_VOLUME_MAX && volumeFloat < 100) {
      setVolumeType("max");
      setIsMuted(false);
    }
  };

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const volumeNum = Number(e.target.value);
    setVolume(volumeNum);
    changeVolumeType(volumeNum);
  };

  return (
    <div className="w-fit flex flex-row justify-end items-center flex-grow-0 flex-shrink-1 basis-[126px]">
      <button
        className="flex flex-row justify-center items-center w-8 h-8 opacity-80 hover:opacity-100 active:opacity-80"
        onClick={handleMute}
      >
        <Image
          src={`/images/white-volume-${isMuted ? "mute" : volumeType}-icon.svg`}
          width={16}
          height={16}
          alt="Next Song Icon"
          draggable={false}
        />
      </button>
      <div className="flex w-[94px] flex-row justify-start items-center bg-[#FFFFFF80] h-1 rounded-full">
        <div
          className="h-full w-full flex bg-white rounded-full hover:bg-[#1db954]"
          style={{ width: `${volume}%` }}
        >
          <input
            id="volume"
            className="flex w-[94px] flex-row justify-start items-center bg-transparent h-1 rounded-full outline-none cursor-pointer appearance-none"
            type="range"
            value={volume}
            onChange={(e) => changeVolume(e)}
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}

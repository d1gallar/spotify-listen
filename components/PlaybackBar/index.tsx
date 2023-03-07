"use client";

import { useCurrentTrack } from "@/hooks/CurrentTrack";
import { usePlayback } from "@/hooks/Playback";
import useHover from "@/hooks/Hover";
import { formatDuration } from "@/util/util";
import "./PlaybackBar.css";

export default function PlaybackBar() {
  const { isHover, eventHandlers } = useHover();

  const { currentTrack } = useCurrentTrack();
  const { currentProgress, handleCurrentProgress } = usePlayback();
  const { onMouseOut, onMouseOver } = eventHandlers;
  if (!currentTrack) return null;

  const trackDuration = formatDuration(currentTrack.duration_ms);
  const progress = formatDuration(currentProgress);
  const width = (currentProgress / currentTrack.duration_ms) * 100;
  return (
    <div className="w-full h-fit flex flex-row items-center gap-4">
      <div className="flex flex-row justify-end font-circular text-[#B3B3B3] text-[11px]">
        {progress}
      </div>
      <div className="relative w-full flex flex-row items-center bg-[#FFFFFF80] h-1 rounded-full">
        <div
          className={`h-full flex rounded-full ${
            isHover ? "bg-[#1db954]" : "bg-white"
          }`}
          style={{ width: `${width}%` }}
        ></div>
        <input
          id="playback"
          className="absolute flex w-full flex-row justify-start items-center bg-transparent h-1 rounded-full outline-none cursor-pointer appearance-none"
          type="range"
          value={currentProgress}
          onChange={(e) => handleCurrentProgress(e)}
          min={0}
          max={currentTrack.duration_ms}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        />
      </div>
      <div className="flex flex-row justify-end font-circular text-[#B3B3B3] text-[11px]">
        {trackDuration}
      </div>
    </div>
  );
}

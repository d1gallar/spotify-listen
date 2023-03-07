"use client";

import DevicePickerBtn from "../DevicePickerBtn";
import PlayerControls from "../SongControls";
import VolumeControl from "../VolumeControl";
import CurrentSong from "../CurrentSong";
import HeartBtn from "../HeartBtn";
import QueueBtn from "../QueueBtn";

export default function NowPlayingBar() {
  return (
    <div className="flex flex-row w-full h-fit">
      <footer className="w-full h-auto min-w-[620px] border-t border-[#282828] border-solid">
        <div className="bg-[#181818] flex flex-row h-[90px] px-4 justify-between items-center translate-x-0">
          <div className="w-1/3 min-w-[130px]">
            <div className="relative flex flex-row justify-start items-center gap-2">
              <CurrentSong />
              <HeartBtn isLiked={true} trackId={""} setTrackLiked={function (trackLiked: boolean): void {
                throw new Error("Function not implemented.");
              } } />
            </div>
          </div>
          <div className="w-[40%] h-full max-w-[722px]">
            <PlayerControls />
          </div>
          <div className="w-1/3 flex flex-row justify-end items-center gap-0">
            <QueueBtn />
            <DevicePickerBtn />
            <VolumeControl />
          </div>
        </div>
      </footer>
    </div>
  );
}

import NextSongBtn from "../NextSongBtn";
import PlaybackBar from "../PlaybackBar";
import PlaySongBtn from "../PlaySongBtn";
import PrevSongBtn from "../PrevSongBtn";
import ShuffleBtn from "../ShuffleBtn";
import RepeatSongBtn from "../RepeatSongBtn";

export default function PlayerControls() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-fit mb-3 flex flex-row flex-nowrap gap-4">
        <div className="h-full flex flex-row items-center justify-end flex-1 gap-2">
          <ShuffleBtn />
          <PrevSongBtn />
        </div>
        <div className="w-[32px] max-w-[32px] min-w-[32px] h-full flex flex-row items-center justify-center flex-1">
          <PlaySongBtn />
        </div>
        <div className="h-full flex flex-row items-center justify-start flex-1 gap-2">
          <NextSongBtn />
          <RepeatSongBtn />
        </div>
      </div>
      <PlaybackBar />
    </div>
  );
}

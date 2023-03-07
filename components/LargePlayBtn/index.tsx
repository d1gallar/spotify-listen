"use client";

import Image from "next/image";
import { usePlayback } from "@/hooks/Playback";
import { useCurrentPlaylist } from "@/hooks/CurrentPlaylist";
import { Tracks } from "@/types/spotify";

type LargePlaySongBtnProps = {
  playlistName: string;
  tracks: Tracks;
  trackUris: string[];
};

export default function LargePlaySongBtn(props: LargePlaySongBtnProps) {
  const { isPlaying, handlePlayPause } = usePlayback();
  const { currentPlaylist, playPlaylist, playlistUris } = useCurrentPlaylist();

  const handlePlay = () => {
    if (props.playlistName !== currentPlaylist && (!isPlaying || isPlaying)) {
      // console.log(
      //   "largeplaybtn: ",
      //   "currentPlaylist: " + currentPlaylist,
      //   props.trackUris
      // );
      playPlaylist(props.playlistName, props.trackUris, props.tracks);
    } else {
      handlePlayPause();
    }
  };

  return (
    <button
      className="bg-spotify-green rounded-full flex flex-row justify-center items-center w-12 h-12 scale-100 hover:scale-105 active:scale-[98%]"
      onClick={handlePlay}
    >
      {props.playlistName === currentPlaylist && isPlaying ? (
        <Image
          src="/images/black-song-pause-icon.svg"
          width={22}
          height={22}
          alt="Pause Song Icon"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/black-song-play-icon.svg"
          width={22}
          height={22}
          alt="Play Song Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

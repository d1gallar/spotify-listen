import Image from "next/image";
import { usePlayback } from "@/hooks/Playback";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import { useCurrentPlaylist } from "@/hooks/CurrentPlaylist";
import { Tracks } from "@/types/spotify";
import PlayAnimateIcon from "../PlayAnimateIcon";

type RankPlayPauseBtnProps = {
  rank: number;
  isHover: boolean;
  trackId: string;
  playlistName: string;
  trackUris: string[];
  tracks: Tracks;
};

export default function RankPlayPauseBtn(props: RankPlayPauseBtnProps) {
  const { currentTrackId } = useCurrentTrack();
  const { handlePlayPause, isPlaying } = usePlayback();
  const { playPlaylist, playlistIndex, currentPlaylist} = useCurrentPlaylist();

  const playTrackInPlaylist = () => {
    playPlaylist(props.playlistName, props.trackUris, props.tracks, props.rank-1);
  };

  let rankButton = null;
  const currentPos = props.rank-1;
  if (!props.isHover && props.trackId === currentTrackId && isPlaying && currentPos === playlistIndex && props.playlistName === currentPlaylist) {
    rankButton = <PlayAnimateIcon />;
  } else if (props.isHover && props.trackId === currentTrackId && currentPos === playlistIndex && isPlaying && props.playlistName === currentPlaylist) {
    rankButton = (
      <button className="absolute" onClick={handlePlayPause}>
        <Image
          src="/images/white-pause-icon.svg"
          width={24}
          height={24}
          alt="Pause Icon"
          draggable={false}
        />
      </button>
    );
  } else if (!props.isHover && (props.trackId !== currentTrackId || props.playlistName !== currentPlaylist || currentPos !== playlistIndex )) {
    rankButton = (
      <>
        <span className="font-circular text-base tracking-tight text-[#B3B3B3] font-bold box-border absolute top-[-4px] right-[.25em] hover:text-transparent">
          {props.rank}
        </span>
      </>
    );
  } else if (props.isHover && (props.trackId !== currentTrackId  || props.playlistName !== currentPlaylist || currentPos !== playlistIndex )) {
    rankButton = (
      <button
        className="absolute"
        onClick={() => playTrackInPlaylist()}
      >
        <Image
          src="/images/white-hover-play-icon.svg"
          width={24}
          height={24}
          alt="Play Icon"
          draggable={false}
        />
      </button>
    );
  } else if (props.isHover && props.trackId === currentTrackId && !isPlaying) {
    rankButton = (
      <button className="absolute" onClick={handlePlayPause}>
        <Image
          src="/images/white-hover-play-icon.svg"
          width={24}
          height={24}
          alt="Play Icon"
          draggable={false}
        />
      </button>
    );
  } else if (!props.isHover && props.trackId === currentTrackId && currentPos === playlistIndex && !isPlaying) {
    rankButton = (
      <>
        <span className="font-circular text-base tracking-tight text-spotify-green font-bold box-border absolute top-[-4px] right-[.25em] hover:text-transparent">
          {props.rank}
        </span>
      </>
    );
  }

  return (
    <div className="h-full flex items-center justify-self-end" role="gridcell">
      <div className="inline-block h-[16px] min-h-[16px] min-w-[16px] relative w-[16px]">
        {rankButton}
      </div>
    </div>
  );
}

import Image from "next/image";
import { useState } from "react";
import { useToggle } from "@/hooks/Toggle";
import useHover from "@/hooks/Hover";
import MoreTrackInfoBtn from "../MoreTrackInfoBtn";
import TrackMoreInfoBox from "../TrackMoreInfoBox";
import RankPlayBtn from "../RankPlayBtn";
import HeartBtn from "../HeartBtn";
import { formatDuration, humanizeAddedAt } from "@/util/util";
import { Artist, Tracks } from "@/types/spotify";
import "./PlaylistTrack.css";
import Artists from "../Artists";
import { useSavedTracks } from "@/hooks/SavedTracks";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import { useCurrentPlaylist } from "@/hooks/CurrentPlaylist";

type PlaylistTrackProps = {
  rank: number;
  imgSrc: string;
  trackName: string;
  trackHref: string;
  addedAt?: string;
  artists: Artist[];
  albumName: string;
  albumHref: string;
  albumId: string;
  duration: number;
  isLiked: boolean;
  isPlayable?: boolean;
  id: string;
  uri: string;
  isPlaying?: boolean;
  isSavedPlaylist?: boolean;
  playlistName: string;
  tracks: Tracks;
  trackUris: string[];
};

export default function PlaylistTrack(props: PlaylistTrackProps) {
  const { isHover, eventHandlers } = useHover();
  const { onMouseOver, onMouseOut } = eventHandlers;
  const [isOpen, toggleMoreTrackInfo] = useToggle();
  const { currentTrack } = useCurrentTrack();
  const { currentPlaylist, playlistIndex } = useCurrentPlaylist();
  const { removeTrack } = useSavedTracks();

  const [trackLiked, setTrackLikedState] = useState(props.isLiked);

  const setTrackLiked = (isLiked: boolean) => {
    setTrackLikedState(isLiked);
    if (props.isSavedPlaylist) {
      removeTrack(props.rank - 1);
    }
  };

  const trackDuration = formatDuration(props.duration);
  const isActiveTrack =
    props.id === currentTrack?.id &&
    props.rank - 1 === playlistIndex;
    currentPlaylist === props.playlistName;
  
  let humanAddedAt;
  if (props.addedAt) humanAddedAt = humanizeAddedAt(props.addedAt);
  if (props.isSavedPlaylist && !trackLiked) return null;
  return (
    <div role="row">
      <div
        className="grid gap-4 playlist-grid items-center relative h-[56px] border-solid border-[1px] border-transparent px-6 hover:rounded-md hover:backdrop hover:backdrop-brightness-125"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <RankPlayBtn
          rank={props.rank}
          isHover={isHover}
          trackId={props.id}
          playlistName={props.playlistName}
          trackUris={props.trackUris}
          tracks={props.tracks}
        />
        <div
          className="w-full flex justify-self-start items-center border-box overflow-x-hidden min-w-[120px]"
          role="gridcell"
        >
          <Image
            className="mr-4 flex-shrink-0 object-cover object-center"
            src={props.imgSrc}
            width={40}
            height={40}
            alt={props.trackName}
            draggable={false}
          />
          <div className="flex flex-col border-box overflow-hidden break-all whitespace-nowrap pr-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={`font-circular text-sm tracking-wide font-medium hover:underline ${
                isActiveTrack
                  ? "text-spotify-green"
                  : "text-white"
              }`}
              href={props.trackHref}
            >
              <p className="overflow-hidden text-ellipsis">{props.trackName}</p>
            </a>
            <Artists artists={props.artists} />
          </div>
        </div>
        <div className="w-full flex justify-self-start items-center overflow-x-hidden break-all whitespace-nowrap min-w-[56px]">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="w-full font-circular text-sm tracking-tight font-medium text-white hover:underline"
            href={props.albumHref}
          >
            <p className="overflow-x-hidden text-ellipsis">{props.albumName}</p>
          </a>
        </div>
        {props.addedAt && (
          <div className="w-full flex justify-self-start items-center overflow-x-hidden break-all whitespace-nowrap min-w-[56px]">
            <p className="w-fit h-fit flex justify-self-end font-circular text-sm tracking-tight text-[#B3B3B3] font-base">
              {humanAddedAt}
            </p>
          </div>
        )}
        <div className="w-full h-full flex flex-row justify-between items-center gap-2">
          <HeartBtn
            isLiked={trackLiked}
            isHover={isHover}
            trackId={props.id}
            setTrackLiked={setTrackLiked}
          />
          <span className="w-fit h-fit flex justify-self-end font-circular text-sm tracking-tight text-[#B3B3B3] font-bold">
            {trackDuration}
          </span>
          <MoreTrackInfoBtn isHover={isHover} onClick={toggleMoreTrackInfo} />
        </div>
      </div>
      <TrackMoreInfoBox
        close={toggleMoreTrackInfo}
        isOpen={isOpen}
        id={props.id}
        uri={props.uri}
        trackName={props.trackName}
        trackHref={props.trackHref}
        artistHref={props.artists[0].external_urls.spotify}
        albumHref={props.albumHref}
        isLiked={trackLiked}
        setTrackLiked={setTrackLiked}
        albumId={props.albumId}
        artists={props.artists}
      />
    </div>
  );
}

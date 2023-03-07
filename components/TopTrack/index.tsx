import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import { useToggle } from "@/hooks/Toggle";
import useHover from "@/hooks/Hover";
import MoreTrackInfoBtn from "../MoreTrackInfoBtn";
import TrackMoreInfoBox from "../TrackMoreInfoBox";
import RankPlayBtn from "../RankPlayBtn";
import HeartBtn from "../HeartBtn";
import { Artist, Copyrights } from "@/types/spotify";
import { formatDuration } from "@/util/util";
import "./TopTrack.css";
import Artists from "../Artists";
import { useTopTracks } from "@/hooks/TopTracks";
import { useCurrentPlaylist } from "@/hooks/CurrentPlaylist";

type TopTrackProps = {
  rank: number;
  imgSrc: string;
  trackName: string;
  trackHref: string;
  artists: Artist[];
  albumName: string;
  albumHref: string;
  albumId: string;
  duration: number;
  isLiked: boolean;
  uri: string;
  id: string;
  playlistName: string;
};

export default function TopTrack(props: TopTrackProps) {
  const { isHover, eventHandlers } = useHover();
  const { trackUris, topTracks } = useTopTracks();
  const { currentTrack } = useCurrentTrack();
  const { playlistIndex, currentPlaylist } = useCurrentPlaylist();
  const [isOpen, toggleMoreTrackInfo] = useToggle();
  const { onMouseOver, onMouseOut } = eventHandlers;
  const trackDuration = formatDuration(props.duration);

  const [trackLiked, setTrackLiked] = useState(props.isLiked);

  const isActiveTrack =
    props.trackName === currentTrack?.name &&
    props.rank - 1 === playlistIndex &&
    currentPlaylist === props.playlistName;

  return (
    <>
      <div role="row">
        <div
          className="grid gap-4 top-tracks-grid-row items-center relative h-[56px] border-solid border-[1px] border-transparent px-6 z-1 hover:rounded-md hover:backdrop hover:backdrop-brightness-125"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <RankPlayBtn
            rank={props.rank}
            isHover={isHover}
            trackId={props.id}
            playlistName={props.playlistName}
            trackUris={trackUris}
            tracks={topTracks}
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
                className={`w-fit font-circular text-sm tracking-wide ${
                  isActiveTrack ? "text-spotify-green" : "text-white"
                } font-medium hover:underline`}
                href={props.trackHref}
              >
                <p className="overflow-hidden text-ellipsis">
                  {props.trackName}
                </p>
              </a>
              <Artists artists={props.artists} />
            </div>
          </div>
          <div
            className="w-full flex justify-self-start items-center overflow-x-hidden break-all whitespace-nowrap min-w-[56px]"
            role="gridcell"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-circular text-sm tracking-tight font-medium text-white hover:underline"
              href={props.albumHref}
            >
              <p className="overflow-x-hidden text-ellipsis">
                {props.albumName}
              </p>
            </a>
          </div>
          <div
            className="w-full h-full flex flex-row justify-end items-center gap-2 col-[last]"
            role="gridcell"
          >
            <HeartBtn
              isLiked={trackLiked}
              isHover={isHover}
              trackId={props.id}
              setTrackLiked={setTrackLiked}
            />
            <div className="flex justify-end gap-2 w-[150px]">
              <span className="w-fit h-fit flex justify-start font-circular text-sm tracking-tight text-[#B3B3B3] font-bold">
                {trackDuration}
              </span>
              <MoreTrackInfoBtn
                isHover={isHover}
                onClick={toggleMoreTrackInfo}
              />
            </div>
          </div>
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
    </>
  );
}

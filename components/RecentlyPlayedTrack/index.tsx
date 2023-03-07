import Image from "next/image";
import { useState } from "react";
import { useToggle } from "@/hooks/Toggle";
import useHover from "@/hooks/Hover";
import TrackMoreInfoBox from "../TrackMoreInfoBox";
import MoreTrackInfoBtn from "../MoreTrackInfoBtn";
import RankPlayBtn from "../RankPlayBtn";
import HeartBtn from "../HeartBtn";
import Artists from "../Artists";
import { Artist, Tracks } from "@/types/spotify";
import "./RecentlyPlayedTrack.css";
import { usePlayback } from "@/hooks/Playback";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import useRecentlyPlayed from "@/hooks/RecentlyPlayed";
import { useCurrentPlaylist } from "@/hooks/CurrentPlaylist";

type RecentlyPlayedTrackProps = {
  rank: number;
  imgSrc: string;
  trackName: string;
  trackHref: string;
  artists: Artist[];
  albumName: string;
  albumHref: string;
  albumId: string;
  duration: string;
  isLiked: boolean;
  playedAt: string;
  uri: string;
  id: string;
  isPlayable?: boolean;
  playlistName: string;
};

export default function RecentlyPlayedTrack(props: RecentlyPlayedTrackProps) {
  const { isHover, eventHandlers } = useHover();
  const { onMouseOver, onMouseOut } = eventHandlers;
  const { recentTracks, recentTrackUris } = useRecentlyPlayed();
  const { currentTrack } = useCurrentTrack();
  const { currentPlaylist, playlistIndex } = useCurrentPlaylist();

  const [isOpen, toggleMoreTrackInfo] = useToggle();
  const [trackLiked, setTrackLiked] = useState(props.isLiked);

  const playedDate = new Date(props.playedAt);
  const playedAtNice = playedDate.toDateString();
  const playedAtLocale = playedDate.toLocaleTimeString();

  const isActiveTrack =
    props.id === currentTrack?.id &&
    props.rank - 1 === playlistIndex &&
    currentPlaylist === props.playlistName;
    
  const tracks = recentTracks.map((item) => item.track);
  return (
    <>
      <div role="row">
        <div
          className="grid gap-4 song-list-grid items-center relative h-[56px] border-solid border-[1px] border-transparent px-6 hover:rounded-md hover:backdrop hover:backdrop-brightness-125"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <RankPlayBtn
            rank={props.rank}
            isHover={isHover}
            trackId={props.id}
            playlistName={props.playlistName}
            trackUris={recentTrackUris}
            tracks={tracks}
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
                className={`font-circular text-sm tracking-widefont-medium hover:underline ${
                  isActiveTrack ? "text-spotify-green" : "text-white"
                }`}
                href={props.trackHref}
              >
                <p className="overflow-hidden text-ellipsis">
                  {props.trackName}
                </p>
              </a>
              <Artists artists={props.artists} />
            </div>
          </div>
          <div className="w-full flex justify-self-start items-center overflow-x-hidden break-all whitespace-nowrap min-w-[56px]">
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
          <div className="w-full h-fit flex flex-row items-center">
            <span className="w-fit h-fit font-circular text-sm tracking-tight text-[#B3B3B3] font-bold">
              {props.duration}
            </span>
          </div>
          <div className="w-full h-full flex items-center justify-self-end gap-6 mr-8">
            <HeartBtn
              isLiked={trackLiked}
              trackId={props.id}
              isHover={isHover}
              setTrackLiked={setTrackLiked}
            />
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <span className="font-circular text-xs tracking-tight text-[#B3B3B3] font-bold whitespace-nowrap">
                  {playedAtNice}
                </span>
                <span className="font-circular text-xs tracking-tight text-[#B3B3B3] font-bold whitespace-nowrap">
                  {playedAtLocale}
                </span>
              </div>
              <MoreTrackInfoBtn
                isHover={isHover}
                onClick={toggleMoreTrackInfo}
              />
            </div>
          </div>
        </div>
      </div>
      <TrackMoreInfoBox
        isOpen={isOpen}
        close={toggleMoreTrackInfo}
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

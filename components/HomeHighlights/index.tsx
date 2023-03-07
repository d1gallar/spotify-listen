"use client";

import Image from "next/image";
import { createRef, useEffect } from "react";
import { useHorizontalOverflow } from "@/hooks/HorizontalOverflow";
import { useTimePeriod } from "@/hooks/TimePeriod";
import { useTopItems } from "@/hooks/TopItems";
import HighlightContainer from "../HighlightContainer";
import { HomeHighlightSkeleton } from "../Skeletons";
import HighlightCard from "../HighlightCard";
import { Artist, Track } from "@/types/spotify";

export default function HomeHighlights() {
  const topSongRef = createRef<HTMLDivElement>();
  const topSongSubRef = createRef<HTMLDivElement>();
  const topArtistRef = createRef<HTMLDivElement>();

  const isTopSongOverflowed = useHorizontalOverflow(topSongRef);
  const isTopSongSubOverflowed = useHorizontalOverflow(topSongSubRef);
  const isTopArtistOverflowed = useHorizontalOverflow(topArtistRef);

  const { topItems: topArtists, isLoading: artistLoading } = useTopItems({
    type: "artists",
    limit: 1,
  });
  const { topItems: topTracks, isLoading: trackLoading } = useTopItems({
    type: "tracks",
    limit: 1,
  });

  if (!topArtists || !topTracks || artistLoading || trackLoading)
    return <HomeHighlightSkeleton />;

  const topArtist = topArtists.items[0] as Artist;
  const topTrack = topTracks.items[0] as Track;

  return (
    <HighlightContainer>
      <HighlightCard className="bg-dark-yellow">
        <div className="w-full h-full flex flex-row justify-between gap-4 overflow-clip">
          <Image
            src={topArtist.images[0].url}
            alt="song"
            width={150}
            height={150}
            draggable={false}
          />
          <div className="w-full h-full flex flex-col justify-start overflow-x-hidden">
            <h3 className="w-full font-circular text-white font-bold tracking-[-0.04em]">
              Top Artist
            </h3>
            <div
              className="w-full max-w-full h-fit relative"
              ref={topArtistRef}
            >
              <h4
                className={`w-fit h-fit font-circular text-white font-semibold tracking-[-0.04em] whitespace-nowrap relative overflow-y-none overflow-x-hidden cursor-default ${
                  isTopArtistOverflowed && "hover:animate-slideText"
                }`}
              >
                {topArtist.name}
              </h4>
            </div>
          </div>
        </div>
      </HighlightCard>
      <HighlightCard className="bg-dark-pink">
        <div className="w-full h-full flex flex-row justify-between gap-4 overflow-clip">
          <Image
            src={topTrack.album.images[0].url}
            alt="song"
            width={150}
            height={150}
            draggable={false}
          />
          <div className="w-full h-full flex flex-col justify-between gap-2 overflow-x-hidden">
            <h3 className="w-full font-circular text-white font-bold tracking-[-0.04em]">
              Top Song
            </h3>
            <div className="w-full max-w-full h-fit relative" ref={topSongRef}>
              <h4
                className={`w-fit h-fit font-circular text-white font-semibold tracking-[-0.04em] whitespace-nowrap relative overflow-y overflow-x-hidden cursor-default ${
                  isTopSongOverflowed && "hover:animate-slideText"
                }`}
              >
                {topTrack.name}
              </h4>
            </div>
            <div
              className="w-full h-full max-w-full relative"
              ref={topSongSubRef}
            >
              <h6
                className={`w-fit h-fit font-circular text-white tracking-[-0.04em] whitespace-nowrap relative overflow-y overflow-x-hidden cursor-default ${
                  isTopSongSubOverflowed && "hover:animate-slideText"
                }`}
              >
                {topTrack.artists[0].name}
              </h6>
            </div>
          </div>
        </div>
      </HighlightCard>
    </HighlightContainer>
  );
}

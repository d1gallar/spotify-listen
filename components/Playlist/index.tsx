"use client";

// Note: not connected!
import Image from "next/image";
import { useSession } from "next-auth/react";
import CreatePlaylistBtn from "../CreatePlaylistBtn";
import LargePlaySongBtn from "../LargePlayBtn";
import PlaylistLegend from "../PlaylistLegend";
import PlaylistTrack from "../PlaylistTrack";
import { formatDurationToHourMinSec } from "@/util/util";
import { Tracks } from "@/types/spotify";

type PlaylistProps = {
  tracks: Tracks;
  createdAt: Date;
  duration: number;
};

export default function Playlist(props: PlaylistProps) {
  const { data: session } = useSession();
  if (!session || !session.user) return null;
  const userImage = session.user.image || "";
  const userName = session.user.name || "";
  const getYear = new Date(props.createdAt).getFullYear().toString();
  const formatDuration = formatDurationToHourMinSec(props.duration) as string;
  const trackUris = props.tracks.map((track) => track.uri);
  return (
    <>
      <div className="flex flex-row justify-start items-end gap-4">
        <Image
          src="images/top-songs-cover.svg"
          width={200}
          height={200}
          alt="Top Songs Playlist Cover"
          draggable={false}
        />
        <div className="flex flex-col justify-end items-start gap-2">
          <p className="font-circular text-sm uppercase font-medium tracking-tighter text-white">
            Playlist
          </p>
          <h1 className="text-7xl font-circular text-white font-bold tracking-tight">
            My Top Songs
          </h1>
          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              className="rounded-full"
              src={userImage}
              width={28}
              height={28}
              alt="User's Profile Photo"
            />
            <p className="font-circular text-sm font-semibold tracking-tighter text-white hover:underline hover:cursor-pointer">
              {userName}
            </p>
            <span className="font-circular text-sm font-semibold tracking-tighter text-white">
              &#8226;
            </span>

            <p className="font-circular text-sm font-medium tracking-tighter text-white">
              {getYear}
            </p>
            <span className="font-circular text-sm font-semibold tracking-tighter text-white">
              &#8226;
            </span>
            <p className="font-circular text-sm font-medium tracking-tighter text-white">
              {props.tracks.length} songs {formatDuration && ","}
            </p>
            <p className="font-circular text-sm font-medium tracking-tighter text-white">
              {formatDuration}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col justify-start mt-8">
        <div className="w-full h-fit flex flex-row justify-between py-6">
          <LargePlaySongBtn playlistName={""} tracks={[]} trackUris={[]} />
          <CreatePlaylistBtn trackUris={trackUris} />
        </div>
        <div className="w-full h-fit flex-col">
          <PlaylistLegend />
          <PlaylistTrack
            rank={0}
            imgSrc={""}
            trackName={""}
            trackHref={""}
            artists={[]}
            albumName={""}
            albumHref={""}
            duration={0}
            isLiked={false}
            uri={""}
            id={""}
            addedAt={""}
            albumId={""}
            playlistName={""}
            tracks={[]}
            trackUris={[]}
          />
        </div>
      </div>
    </>
  );
}

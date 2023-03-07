"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { formatDurationToHourMinSec } from "@/util/util";
import { Owner } from "@/types/spotify";

type PlaylistTopProps = {
  collaborative: boolean;
  image: string;
  name: string;
  public: boolean;
  playlistLength: number;
  followerTotal?: number;
  owner?: Owner;
  totalDuration?: number;
  description?: string;
  gradient?: string;
};

export default function PlaylistTop(props: PlaylistTopProps) {
  const { data: session } = useSession();
  if (!session || !session.user) return null;
  const userImage = session.user.image || "";
  const userName = session.user.name || "";
  return (
    <section
      className={`flex flex-row justify-start items-end gap-4 -mx-8 -mt-[8vh] pt-32 px-8 pb-10 bg-gradient-to-b ${props.gradient}`}
    >
      <Image
        src={props.image}
        width={200}
        height={200}
        alt={props.name + " Playlist Cover"}
        draggable={false}
      />
      <div className="flex flex-col justify-end items-start gap-2">
        <p className="font-circular text-sm uppercase font-medium tracking-tighter text-white">
          Playlist
        </p>
        <h1 className="text-7xl font-circular text-white font-bold tracking-tight">
          {props.name}
        </h1>
        {props.description !== null && props.description !== "" && (
          <p className="mt-2 font-circular text-sm tracking-tight text-[#B3B3B3] font-medium">
            {props.description}
          </p>
        )}
        <div className="flex flex-row justify-start items-center gap-2">
          <Image
            className="rounded-full"
            src={userImage}
            width={28}
            height={28}
            alt="User's Profile Photo"
            draggable={false}
          />
          <p className="font-circular text-sm font-semibold tracking-tighter text-white">
            {userName}
          </p>
          {props.playlistLength !== 0 && (
            <span className="font-circular text-sm font-semibold tracking-tighter text-white">
              &#8226;
            </span>
          )}
          <p className="font-circular text-sm tracking-tighter text-white">
            {props.playlistLength > 0 ? props.playlistLength + " songs" : ""}
            {props.totalDuration && ","}
          </p>
          {props.totalDuration && (
            <p className="font-circular text-sm tracking-tighter text-[#B3B3B3]">
              {formatDurationToHourMinSec(props.totalDuration)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

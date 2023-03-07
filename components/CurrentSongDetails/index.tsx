"use client";

import { Track } from "@/types/spotify";
import Artists from "../Artists";
import "./CurrentSongDetails.css";

type CurrentSongDetailsProps = {
  currentTrack: Track;
};

export default function CurrentSongDetails(props: CurrentSongDetailsProps) {
  return (
    <div className="w-fit flex flex-col border-box overflow-hidden break-all whitespace-nowrap gradient-mask">
      <a
        className="font-circular text-sm text-white font-medium pr-3 pl-[0.375rem] hover:underline"
        href={props.currentTrack.external_urls.spotify}
        target="_blank"
      >
        <p>{props.currentTrack.name}</p>
      </a>
      <div className="pl-[0.375rem] pr-3">
          <Artists artists={props.currentTrack.artists} />
        </div>
    </div>
  );
}

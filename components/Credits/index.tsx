// import useSpotify from "@/hooks/Spotify";
import useOnClickOutside from "@/hooks/OnClickOutside";
import { Album, Artist, Copyrights } from "@/types/spotify";
import Image from "next/image";
import { createRef } from "react";
// import { useEffect, useState } from "react";

type CreditsProps = {
  isOpen: boolean;
  toggle: () => void;
  trackName: string;
  artists: Artist[];
  albumLabel: string;
  albumCopyrights: Copyrights;
};

export function CreditArtists({ artists }: { artists: Artist[] }) {
  if (artists.length === 0) return null;

  if (artists.length === 1) {
    const artist = artists[0];
    const artistHref = artist.external_urls.spotify;
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="font-circular text-[#A7A7A7] text-sm font-base hover:underline"
        href={artistHref}
      >
        <p className="overflow-hidden text-ellipsis">{artists[0].name}</p>
      </a>
    );
  }

  const artistMap = artists.map((artist, i) => {
    const artistHref = artist.external_urls.spotify;
    return (
      <div
        className="flex flex-row whitespace-nowrap overflow-ellipsis"
        key={artist.id}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="font-circular text-[#A7A7A7] text-sm font-base hover:underline"
          href={artistHref}
        >
          <p className="overflow-hidden text-ellipsis">{artist.name}</p>
        </a>
        <p className="font-circular text-[#A7A7A7] text-sm font-base">
          {i !== artists.length - 1 ? ", " : ""}&nbsp;
        </p>
      </div>
    );
  });

  return <div className="flex flex-row">{...artistMap}</div>;
}

export default function Credits(props: CreditsProps) {
  const clickOutsideRef = createRef<HTMLDivElement>();

  const handleOutsideClick = () => {
    props.toggle();
  };
  useOnClickOutside(clickOutsideRef, handleOutsideClick);

  return props.isOpen ? (
    <div className="absolute h-screen w-screen top-0 left-0 flex flex-row items-center justify-center bg-[#000000bb] z-10">
      <div
        className="flex flex-col justify-start items-start min-w-[40vw] max-w-[40vw] w-fit shadow-lg"
        ref={clickOutsideRef}
      >
        <div className="w-full bg-[#333] pt-8 px-8 pb-4 rounded-t-md">
          <div className="w-full flex flex-row justify-between items-center">
            <h3 className="text-white font-medium">Credits</h3>
            <button
              className="flex flex-row justify-center w-9 h-9 items-center hover:scale-110"
              onClick={props.toggle}
            >
              <Image
                src="images/white-cancel-icon.svg"
                width={36}
                height={36}
                alt="Cancel Button"
                draggable={false}
              />
            </button>
          </div>
        </div>
        <hr className="w-full bg-[#333] h-[2px] text-[#ffffff23]"></hr>
        <div className="w-full bg-[#333] pt-4 px-8 pb-8 rounded-b-md">
          <div className="flex flex-col justify-start items-start gap-4 overflow-y-scroll overflow-x-hidden">
            <p className="text-white font-medium text-[18px]">
              {props.trackName}
            </p>
            <div className="flex flex-col gap-0 justify-start">
              <p className="text-white text-sm font-medium">Performed By</p>
              <CreditArtists artists={props.artists} />
            </div>
            <div className="flex flex-col gap-0 justify-start">
              <p className="text-white text-sm font-medium">Label</p>
              <p className="text-[#A7A7A7] text-sm font-base">
                {props.albumLabel}
              </p>
            </div>

            <div className="flex flex-col justify-start mt-4 gap-4">
              {props.albumCopyrights.map((copyright, i) => (
                <div
                  className="h-fit flex flex-row items-center justify-start gap-1"
                  key={i}
                >
                  <p className="text-white text-sm font-base break-words">
                    {copyright.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

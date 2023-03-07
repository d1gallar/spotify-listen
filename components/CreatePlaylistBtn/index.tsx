"use client";

import Image from "next/image";
import { useState } from "react";
import { usePopUpToggle } from "@/hooks/PopUpToggle";
import { useTimePeriod } from "@/hooks/TimePeriod";
import useSpotify from "@/hooks/Spotify";
import { ENCODED_IMAGE } from "@/util/encoded";

type CreatePlaylistBtnProps = {
  trackUris: string[];
};

export default function CreatePlaylistBtn(props: CreatePlaylistBtnProps) {
  const spotifyWebApi = useSpotify();
  const timePeriodContext = useTimePeriod();
  const { setShowPopUp } = usePopUpToggle();
  const [isDisabled, setDisabled] = useState(false);

  let description = "";
  if (timePeriodContext.timePeriod === "short_term") {
    description = "Here are your top songs from the past month.";
  } else if (timePeriodContext.timePeriod === "medium_term") {
    description = "Here are your top songs from the past 6 months.";
  } else if (timePeriodContext.timePeriod === "long_term") {
    description = "Here are your top songs of all time!";
  }

  const createPlaylist = async () => {
    spotifyWebApi
      .createPlaylist("My Top Songs", {
        description,
        collaborative: false,
        public: false,
      })
      .then(async (res) => {
        const topPlaylist = res.body;
        const id = topPlaylist.id;
        spotifyWebApi.addTracksToPlaylist(id, props.trackUris);
        spotifyWebApi.uploadCustomPlaylistCoverImage(id, ENCODED_IMAGE);
      });
      setShowPopUp({
        removeLiked: false,
        createdPlaylist: true,
        copySongLink: false,
        copySongUri: false,
        addLiked: false,
        noDevice: false
      });
    setDisabled(true);
  };

  return (
    <button
      className="bg-white w-fit min-w-[160px] px-4 rounded-full flex flex-row justify-center items-center h-12 scale-95 gap-2 hover:scale-100 active:scale-[98%] disabled:bg-transparent disabled:border-[1px] disabled:border-white disabled:border-solid disabled:hover:cursor-default disabled:scale-100 disabled:gap-4"
      disabled={isDisabled}
      onClick={createPlaylist}
    >
      {!isDisabled ? (
        <Image
          src="/images/black-plus-icon.svg"
          width={16}
          height={16}
          alt="Add Playlist"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/white-checkmark-icon.svg"
          width={16}
          height={16}
          alt="Saved Icon"
          draggable={false}
        />
      )}
      {!isDisabled ? (
        <p className="font-circular text-black uppercase font-bold tracking-tight">
          Create Playlist
        </p>
      ) : (
        <p className="font-circular text-white uppercase font-medium tracking-tight">
          Saved
        </p>
      )}
    </button>
  );
}

import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import useOnClickOutside from "@/hooks/OnClickOutside";
import { usePopUpToggle } from "@/hooks/PopUpToggle";
import { usePlayback } from "@/hooks/Playback";
import useSpotify from "@/hooks/Spotify";
import useHover from "@/hooks/Hover";
import { useToggle } from "@/hooks/Toggle";
import Credits from "../Credits";
import { Album, Artist, Copyrights } from "@/types/spotify";

type TrackMoreInfoBoxProps = {
  isOpen: boolean;
  close: () => void;
  id: string;
  uri: string;
  trackHref: string;
  trackName: string;
  albumHref: string;
  albumId: string;
  artistHref: string;
  isLiked: boolean;
  setTrackLiked: (trackLiked: boolean) => void;
  artists: Artist[];
};

export default function TrackMoreInfoBox(props: TrackMoreInfoBoxProps) {
  const clickOutsideRef = createRef<HTMLDivElement>();
  const mainBoxRef = createRef<HTMLDivElement>();

  const spotifyWebApi = useSpotify();
  const { setShowPopUp, showPopUp } = usePopUpToggle();
  const { handleAddToQueue } = usePlayback();
  const { isHover, eventHandlers } = useHover();
  const { onMouseOut, onMouseOver } = eventHandlers;
  const { isHover: hoverCopy, eventHandlers: copyEvents } = useHover();
  const { onMouseOut: onMouseOutCopy, onMouseOver: onMouseOverCopy } =
    copyEvents;
  const [isCreditsOpen, toggleCreditsOpen] = useToggle();

  const [boxWidth, setBoxWidth] = useState(0);
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    if (mainBoxRef && mainBoxRef.current) {
      const width = mainBoxRef.current.getBoundingClientRect().width;
      setBoxWidth(width);
    }
  }, [mainBoxRef]);

  const handleOutsideClick = () => {
    props.close();
  };
  useOnClickOutside(clickOutsideRef, handleOutsideClick);

  const handleAddQueue = () => {
    handleAddToQueue(props.uri);
    props.close();
  };

  const copySongLink = () => {
    navigator.clipboard.writeText(props.trackHref);
    setShowPopUp({
      copySongLink: true,
      removeLiked: false,
      createdPlaylist: false,
      copySongUri: false,
      addLiked: false,
      noDevice: false
    });
    props.close();
  };

  const copySongUri = () => {
    navigator.clipboard.writeText(props.uri);
    const { copySongUri, ...rest } = showPopUp;
    setShowPopUp({
      copySongUri: true,
      removeLiked: false,
      createdPlaylist: false,
      copySongLink: false,
      addLiked: false,
      noDevice: false
    });
    props.close();
  };

  const likeTrack = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      spotifyWebApi.addToMySavedTracks([props.id]);
      setShowPopUp({
        addLiked: true,
        removeLiked: false,
        createdPlaylist: false,
        copySongLink: false,
        copySongUri: false,
        noDevice: false
      });
      props.setTrackLiked(true);
    }
  };

  const removeLikedTrack = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      spotifyWebApi.removeFromMySavedTracks([props.id]);
      setShowPopUp({
        removeLiked: true,
        createdPlaylist: false,
        copySongLink: false,
        copySongUri: false,
        addLiked: false,
        noDevice: false
      });
      props.setTrackLiked(false);
    }
  };

  const openCredits = async () => {
    if (!album) {
      await spotifyWebApi.getAlbum(props.albumId).then((res) => {
        const album = res.body as unknown as Album;
        setAlbum(album);
      });
    }
    toggleCreditsOpen();
    props.close();
  };

  return (
    <>
      {props.isOpen ? (
        <div
          className="relative flex flex-row justify-start"
          ref={clickOutsideRef}
        >
          {(isHover || hoverCopy) && (
            <div
              className="absolute shadow-md rounded-md bottom-0 translate-x-[-16px] overflow-y-auto w-[14vw] min-w-[160px] max-w-[350px] h-fit max-h-[calc(100vh-24px)] bg-[#282828] p-1 z-50"
              style={{ right: `calc(${boxWidth}px - 4px)` }}
              onMouseOut={onMouseOutCopy}
              onMouseOver={onMouseOverCopy}
            >
              <button
                className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
                onClick={copySongLink}
              >
                <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                  Copy Link
                </span>
              </button>
              <button
                className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
                onClick={copySongUri}
              >
                <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                  Copy Spotify Uri
                </span>
              </button>
            </div>
          )}
          <div
            className="absolute shadow-md rounded-md right-0 bottom-12 translate-x-[-16px] overflow-y-auto w-[14vw] min-w-[250px] max-w-[-100px] h-fit max-h-[calc(100vh-24px)] bg-[#282828] p-1 z-10"
            ref={mainBoxRef}
          >
            <button
              className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
              onClick={handleAddQueue}
            >
              <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                Add to Queue
              </span>
            </button>
            <hr className="w-full h-[2px] text-[#ffffff23]"></hr>
            <a
              className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
              target="_blank"
              href={props.artistHref}
              onClick={props.close}
            >
              <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                Go to Artist
              </span>
            </a>
            <a
              className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
              target="_blank"
              href={props.albumHref}
              onClick={props.close}
            >
              <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                Go to Album
              </span>
            </a>
            <button
              className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-between hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
              onClick={() => openCredits()}
            >
              <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                Show Credits
              </span>
            </button>
            <hr className="w-full h-[2px] text-[#ffffff23]"></hr>
            {!props.isLiked ? (
              <button
                className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-between hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
                onClick={likeTrack}
              >
                <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                  Save to your Liked Songs
                </span>
              </button>
            ) : (
              <button
                className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-between hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
                onClick={removeLikedTrack}
              >
                <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                  Remove from your Liked Songs
                </span>
              </button>
            )}
            <hr className="w-full h-[2px] text-[#ffffff23]"></hr>
            <button
              className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-between hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
              onMouseOut={onMouseOut}
              onMouseOver={onMouseOver}
            >
              <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                Share
              </span>
              <Image
                src="images/white-triangle-right-icon.svg"
                width={16}
                height={16}
                alt="More"
                draggable={false}
              />
            </button>
          </div>
        </div>
      ) : null}
      {album && (
        <Credits
          isOpen={isCreditsOpen}
          toggle={toggleCreditsOpen}
          trackName={props.trackName}
          albumLabel={album?.label}
          albumCopyrights={album?.copyrights}
          artists={props.artists}
        />
      )}
    </>
  );
}

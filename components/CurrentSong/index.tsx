import Image from "next/image";
import { useExpandedSong } from "@/hooks/ExpandedSong";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import useHover from "@/hooks/Hover";
import ExpandBtn from "../ExpandBtn";
import Artists from "../Artists";

export default function CurrentSong() {
  const { isHover, eventHandlers } = useHover();
  const { currentTrack } = useCurrentTrack();
  const songExpandedContext = useExpandedSong();

  const { onMouseOver, onMouseOut } = eventHandlers;
  const { isSongExpanded, expandSong } = songExpandedContext;

  if (!currentTrack) return null;
  return (
    <>
      <div
        className="relative w-fit"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {isHover && (
          <ExpandBtn
            expand={expandSong}
            className="absolute top-1 right-1 z-10"
          />
        )}
        {!isSongExpanded && (
          <a href={currentTrack.external_urls.spotify} target={"_blank"}>
            <Image
              className="flex justify-self-center items-center max-w-[56px] max-h-[56px] w-[56px] h-[56px] object-cover object-center shadow-lg"
              src={currentTrack.album.images[0].url}
              width={40}
              height={40}
              alt={currentTrack.name}
              draggable={false}
            />
          </a>
        )}
      </div>
      <div className="w-fit flex flex-col border-box overflow-hidden break-all whitespace-nowrap gradient-mask">
        <a
          className="font-circular text-sm text-white font-medium pr-3 pl-[0.375rem] hover:underline"
          href={currentTrack.external_urls.spotify}
          target="_blank"
        >
          <p>{currentTrack.name}</p>
        </a>
        <div className="pl-[0.375rem] pr-3">
          <Artists artists={currentTrack.artists} />
        </div>
      </div>
    </>
  );
}

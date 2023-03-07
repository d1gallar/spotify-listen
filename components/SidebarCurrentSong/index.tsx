import Image from "next/image";
import { useExpandedSong } from "@/hooks/ExpandedSong";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import useHover from "@/hooks/Hover";
import CollapseBtn from "../CollapseBtn";

export default function SidebarSong() {
  const { isHover, eventHandlers } = useHover();
  const songExpandedContext = useExpandedSong();
  const currentTrackContext = useCurrentTrack();
  
  const { onMouseOver, onMouseOut } = eventHandlers;
  const { isSongExpanded, hideSong } = songExpandedContext;
  const { currentTrack } = currentTrackContext;

  if (!currentTrack) return null;
  return isSongExpanded ? (
    <div
      className="relative w-full"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {isHover && (
        <CollapseBtn
          collapse={hideSong}
          className="absolute top-1 right-1 z-10"
        />
      )}
      <Image
        src={currentTrack.album.images[0].url}
        width={100}
        height={100}
        className="relative w-full"
        alt={currentTrack.name}
        draggable={false}
      />
    </div>
  ) : null;
}

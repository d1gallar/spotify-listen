import Image from "next/image";
import { usePlayback } from "@/hooks/Playback";

export default function NextSongBtn() {
  const { handleNext } = usePlayback();
  return (
    <button
      className="flex flex-row justify-center items-center w-8 h-8 opacity-80 hover:opacity-100 active:opacity-80"
      onClick={handleNext}
    >
      <Image
        src="/images/white-song-next-icon.svg"
        width={16}
        height={16}
        alt="Next Song Icon"
        draggable={false}
      />
    </button>
  );
}

import Image from "next/image";
import { usePlayback } from "@/hooks/Playback";
import "./ShuffleBtn.css";

export default function ShuffleBtn() {
  const { isShuffle, handleShuffle } = usePlayback();

  return (
    <button
      className={`relative flex flex-row justify-center items-center w-8 h-8 min-w-8 max-w-8 border-none bg-transparent ${
        !isShuffle
          ? "opacity-80 hover:opacity-100"
          : "green-circle opacity-90 hover:opacity-100"
      }`}
      onClick={handleShuffle}
    >
      {isShuffle ? (
        <Image
          src="/images/green-shuffle-icon.svg"
          width={16}
          height={16}
          alt="Shuffle Song Icon"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/white-shuffle-icon.svg"
          width={16}
          height={16}
          alt="Shuffle Song Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

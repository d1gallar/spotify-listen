import Image from "next/image";

type MoreTrackInfoBtnProps = {
  isHover: boolean;
  onClick: () => void;
}

export default function MoreTrackInfoBtn(props: MoreTrackInfoBtnProps) {
  return (
    <button
      className={`flex flex-row w-5 h-5 items-center justify-center ${props.isHover ? "visible" : "invisible"}`}
      onClick={props.onClick}
    >
      <Image
        src="/images/white-moreinfo-icon.svg"
        width={20}
        height={20}
        alt="More Track Info"
        draggable={false}
      />
    </button>
  );
}

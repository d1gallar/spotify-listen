import Image from "next/image";

type CollapseBtnProps = {
  collapse: () => void;
  className?: string;
}

export default function CollapseBtn(props: CollapseBtnProps) {
  return (
    <button
      className={`w-6 h-6 bg-[#000000cc] rounded-full hover:scale-110 ${props.className}`}
      onClick={()=> props.collapse()}
    >
      <div className="w-full h-full flex flex-row justify-center items-center">
        <Image
          src={"/images/white-chevron-down-icon.svg"}
          width={16}
          height={16}
          alt="Collapse Icon"
          draggable={false}
        />
      </div>
    </button>
  );
}

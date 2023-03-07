import Image from "next/image";

type ExpandBtnProps = {
  expand: () => void;
  className?: string;
};

export default function ExpandBtn(props: ExpandBtnProps) {
  return (
    <button
      className={`w-6 h-6 bg-[#000000cc] rounded-full hover:scale-110 ${props.className}`}
      onClick={() => props.expand()}
    >
      <div className="w-full h-full flex flex-row justify-center items-center">
        <Image
          src={"/images/white-chevron-up-icon.svg"}
          width={16}
          height={16}
          alt="Expand Icon"
          draggable={false}
        />
      </div>
    </button>
  );
}

"use client";

import Image from "next/image";
import { useProfileToggle } from "@/hooks/ProfileToggle";

type FullProfileBtnProps = {
  userImage: string;
  name: string;
};

export default function FullProfileBtn(props: FullProfileBtnProps) {
  const  {isOpen, toggleOpen }  = useProfileToggle();
  return (
    <button
      className="flex flex-row justify-between items-center w-fit h-fit bg-[#000000] p-1 rounded-full gap-2 hover:bg-[#282828]"
      onClick={toggleOpen}
    >
      {props.userImage !== "" && (
        <Image
          className="rounded-full"
          src={props.userImage}
          alt="User Photo"
          width={28}
          height={28}
          draggable={false}
        />
      )}
      <span className="font-circular text-white font-base text-sm tracking-tight">
        {props.name}
      </span>
      {isOpen ? (
        <Image
          className="mr-2"
          src="/images/white-triangle-up-icon.svg"
          alt="Up Icon"
          width={16}
          height={16}
          draggable={false}
        />
      ) : (
        <Image
          className="mr-2"
          src="/images/white-triangle-down-icon.svg"
          alt="Down Icon"
          width={16}
          height={16}
          draggable={false}
        />
      )}
    </button>
  );
}

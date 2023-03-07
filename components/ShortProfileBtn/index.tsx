"use client";

import Image from "next/image";
import { useProfileToggle } from "@/hooks/ProfileToggle";

type ShortProfileBtnProps = {
  userImage: string;
};

export default function ShortProfileBtn(props: ShortProfileBtnProps) {
  const { toggleOpen } = useProfileToggle();
  return (
    <button
      className="flex flex-row justify-between items-center w-fit h-fit bg-[#000000] p-[2px] rounded-full gap-2 hover:bg-[#282828]"
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
    </button>
  );
}

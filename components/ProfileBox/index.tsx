"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useProfileToggle } from "@/hooks/ProfileToggle";

export default function ProfileBox() {
  const profileContext = useProfileToggle();
  const { toggleOpen } = profileContext;

  return (
    <div className="absolute top-0 right-0 shadow-md rounded-[3px] translate-x-[-24px] overflow-y-auto translate-y-[64px] w-[14vw] min-w-[160px] max-w-[350px] h-fit max-h-[calc(100vh-24px)] bg-[#282828] p-1">
      <Link
        className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
        href="/settings"
        onClick={() => toggleOpen()}
      >
        <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
          Settings
        </span>
      </Link>
      <hr className="w-full h-[2px]  text-[#ffffff23]" />
      <button
        className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125"
        onClick={() => signOut()}
      >
        <span
          className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white"
          onClick={() => signOut()}
        >
          Logout
        </span>
      </button>
    </div>
  );
}

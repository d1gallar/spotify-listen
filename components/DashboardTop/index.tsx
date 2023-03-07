"use client";

import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useProfileToggle } from "@/hooks/ProfileToggle";
import useOnClickOutside from "@/hooks/OnClickOutside";
import { useMediaQuery } from "@/hooks/MediaQuery";
import ShortProfileBtn from "../ShortProfileBtn";
import PreviousPageBtn from "../PreviousPageBtn";
import FullProfileBtn from "../FullProfileBtn";
import NextPageBtn from "../NextPageBtn";
import ProfileBox from "../ProfileBox";

const BREAKPT = 910;

export default function DashboardTop() {
  const clickOutsideRef = useRef<HTMLDivElement>(null);
  const profileContext = useProfileToggle();
  const { isOpen, setProfileOpen } = profileContext;
  const breakpt = useMediaQuery(BREAKPT);
  const { data: session } = useSession();

  const clickOutsidehandler = () => {
    setProfileOpen(false);
  };

  useOnClickOutside(clickOutsideRef, clickOutsidehandler);
  return (
    <div className="relative w-full">
      <div
        className={`absolute flex flex-row justify-between items-center w-full h-[64px] px-8 py-2 z-10 bg-transparent`}
        ref={clickOutsideRef}
      >
    {/* <div
      className="sticky flex flex-row justify-between items-center w-[82vw] h-[64px] px-8 py-2 bg-none z-10 border-box"
      ref={clickOutsideRef}
    > */}
      <div className="flex flex-row justify-between items-center gap-4">
        <PreviousPageBtn />
        <NextPageBtn />
      </div>
      {breakpt ? (
        <ShortProfileBtn userImage={session?.user.image || ""} />
      ) : (
        <FullProfileBtn
          userImage={session?.user.image || ""}
          name={session?.user.name || ""}
        />
      )}
      {isOpen && <ProfileBox />}
    </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, Ref, useRef, useState } from "react";
import { NumberSize, Resizable, ResizeDirection } from "re-resizable";
import SidebarTab from "../SidebarTab";
// import SidebarCurrentSong from "../SidebarCurrentSong";

type SidebarProps = {
  path: "/dashboard" | "/stats" | "/liked" | "/songs" | "/artists" | "/albums";
};

const DEFAULT_SIDEBAR_WIDTH = 320;

export default function Sidebar(props: SidebarProps) {
  const [sidebarWidth, setWidth] = useState(DEFAULT_SIDEBAR_WIDTH);

  const sideRef = useRef(null);

  const handleResizeStop = (
    e: MouseEvent,
    direction: ResizeDirection,
    ref: Ref<HTMLElement>,
    d: NumberSize
  ) => {
    setWidth(sidebarWidth + d.width);
  };

  return (
    <Resizable
      defaultSize={{
        width: "18vw",
        height: "100%",
      }}
      minWidth="160px"
      maxWidth="20vw"
      enable={{
        top: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
        right: true,
      }}
      handleClasses={{
        top: "pointer-events-none",
        bottom: "pointer-events-none",
        left: "pointer-events-none",
        topRight: "pointer-events-none",
        bottomRight: "pointer-events-none",
        bottomLeft: "pointer-events-none",
        topLeft: "pointer-events-none",
      }}
      onResizeStop={(e, direction, ref, d) => handleResizeStop}
    >
      <aside className="bg-black w-full h-full overflow-clip" ref={sideRef}>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full h-fit flex flex-col justify-start">
            <div className="w-full h-fit flex flex-col items-start justify-start p-6">
              <Link href="/dashboard">
                <Image
                  src="/images/white-spotify-logo.svg"
                  alt="White Spotify Logo"
                  width={120}
                  height={120}
                  className="min-w-[24px]"
                  draggable={false}
                />
              </Link>
            </div>
            <div className="w-full h-fit flex flex-col justify-start items-start gap-6">
              <div className="w-full">
                <SidebarTab
                  href="/dashboard"
                  label="Home"
                  active={props.path === "/dashboard"}
                >
                  {props.path === "/dashboard" ? (
                    <Image
                      src="/images/white-home-icon.svg"
                      alt="White Home Icon"
                      width={22}
                      height={22}
                      className="min-w-[24px]"
                      draggable={false}
                    />
                  ) : (
                    <Image
                      src="/images/white-unfill-home-icon.svg"
                      alt="White Home Icon"
                      width={22}
                      height={22}
                      className="min-w-[24px]"
                      draggable={false}
                    />
                  )}
                </SidebarTab>
                <SidebarTab
                  href="/songs"
                  label="Top Songs"
                  active={props.path === "/songs"}
                >
                  <Image
                    src="/images/white-music-note-icon.svg"
                    alt="Music Note Icon"
                    width={22}
                    height={22}
                    className="min-w-[24px]"
                    draggable={false}
                  />
                </SidebarTab>
                <SidebarTab
                  href="/artists"
                  label="Top Artists"
                  active={props.path === "/artists"}
                >
                  <Image
                    src="/images/white-user-icon.svg"
                    alt="User Icon"
                    width={22}
                    height={22}
                    className="min-w-[24px]"
                    draggable={false}
                  />
                </SidebarTab>
                <SidebarTab
                  href="/liked"
                  label="Liked Songs"
                  active={props.path === "/liked"}
                >
                  <div className="min-w-[24px] max-w-[24px] p-[.3rem] bg-gradient-to-br from-[#450AF5] to-[#C4EFD9] rounded-sm">
                    <Image
                      src="/images/white-heart-fill-icon.svg"
                      alt="White Heart Icon"
                      width={16}
                      height={16}
                      draggable={false}
                    />
                  </div>
                </SidebarTab>
              </div>
            </div>
          </div>
          {/* <SidebarCurrentSong /> */}
        </div>
      </aside>
    </Resizable>
  );
}

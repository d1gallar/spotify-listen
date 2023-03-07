"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Link as ScrollableLink } from "react-scroll";
import { useMediaQuery } from "@/hooks/MediaQuery";
import HamburgerIcon from "../HamburgerIcon";
import "./Navbar.css";

const SM_BREAKPT = 640;

export default function Navbar() {
  const [collapse, setCollapse] = useState<boolean>(false);
  const showMobile = useMediaQuery(SM_BREAKPT);
  
  useEffect(() => {
    if (!showMobile) setCollapse(false);
  }, [showMobile]);

  return (
    <nav
      className={`min-w-[320px] w-full h-fit py-8 px-8 nav-before ${
        showMobile && collapse ? "h-full open-nav" : "close-nav"
      }`}
    >
      <div className={`w-full h-fit flex flex-row justify-between`}>
        <div className="flex flex-row justify-start min-w-[210px]">
          <Link href="/" className="flex flex-row items-center gap-[0.5rem]">
            <Image
              src="/images/black-spotify-logo.svg"
              height={120}
              width={120}
              alt="Spotify Logo"
              draggable={false}
            />
            <span className="font-circular text-2xl font-base tracking-wide">
              Listen
            </span>
          </Link>
        </div>
        {!showMobile && (
          <ul className="flex flex-row justify-end gap-4 items-center list-none">
            <li className="relative items-center font-circular text-base font-semibold tracking-tight hover:opacity-75">
              <Link href="/" className="nav-circle">
                Home
              </Link>
            </li>
            <li className="relative font-circular text-base font-semibold tracking-tight hover:opacity-75">
              <ScrollableLink
                className="nav-circle cursor-pointer"
                activeClass="active"
                to="getting-started"
                spy={true}
                smooth={true}
                duration={500}
              >
                Getting Started
              </ScrollableLink>
            </li>
            <li className="relative items-center font-circular text-base font-semibold tracking-tight hover:opacity-75">
              <ScrollableLink
                className="nav-circle cursor-pointer"
                activeClass="active"
                to="more-info"
                spy={true}
                smooth={true}
                duration={500}
              >
                More Info
              </ScrollableLink>
            </li>
          </ul>
        )}
        {showMobile && (
          <HamburgerIcon setCollapse={setCollapse} collapse={collapse} />
        )}
      </div>
      {showMobile && collapse && (
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 w-auto h-fit">
            <ul className="flex flex-col justify-center gap-6 items-start list-none">
              <li className="relative font-circular text-4xl font-semibold tracking-tight hover:opacity-75 xsm:text-5xl">
                <Link href="/" className="nav-horizontal-circle">
                  Home
                </Link>
              </li>
              <li className="relative font-circular text-4xl font-semibold tracking-tight hover:opacity-75 xsm:text-5xl">
                <ScrollableLink
                  className="cursor-pointer nav-horizontal-circle"
                  activeClass="active"
                  to="getting-started"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  Getting Started
                </ScrollableLink>
              </li>
              <li className="relative font-circular text-4xl font-semibold tracking-tight hover:opacity-75 xsm:text-5xl">
                <ScrollableLink
                  className="cursor-pointer nav-horizontal-circle"
                  activeClass="active"
                  to="more-info"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  More Info
                </ScrollableLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

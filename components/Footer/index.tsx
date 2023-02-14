"use client";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Image from "next/image";

const GITHUB = "https://github.com/d1gallar/your-spotify";
const SPOTIFY = "https://open.spotify.com/";
const SPOTIFY_ABOUT = "https://www.spotify.com/us/about-us/contact/";

export default function Footer() {
  return (
    <footer className="min-w-[320px] bg-black w-full h-fit p-10 flex flex-col justify-between items-center gap-10 sm:flex-row">
      <Link href="/" className="flex flex-row items-start gap-[0.5rem]">
        <Image
          src="/images/white-spotify-logo.svg"
          height={120}
          width={120}
          alt="Spotify Logo"
          priority
        />
      </Link>
      <div className="flex flex-col justify-center items-center gap-8 sm:flex-row sm:items-start">
        <div className="flex flex-col justify-center items-center gap-2 sm:justify-start">
          <h6 className="uppercase font-bold text-light-gray tracking-tight">
            Company
          </h6>
          <Link href={SPOTIFY}>
            <p className="font-semibold text-white tracking-tight hover:underline hover:cursor-pointer">
              Spotify
            </p>
          </Link>
          <Link href={SPOTIFY_ABOUT}>
            <p className="font-semibold text-white tracking-tight hover:underline hover:cursor-pointer">
              About
            </p>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 sm:justify-start">
          <h6 className="uppercase font-bold text-light-gray tracking-tight">
            Useful Links
          </h6>
          <ScrollLink
            className="font-semibold text-white tracking-tight hover:underline hover:cursor-pointer"
            activeClass="active"
            to="getting-started"
            spy={true}
            smooth={true}
            duration={500}
          >
            Getting Started
          </ScrollLink>
          <ScrollLink
            className="font-semibold text-white tracking-tight hover:underline hover:cursor-pointer"
            activeClass="active"
            to="more-info"
            spy={true}
            smooth={true}
            duration={500}
          >
            More Info
          </ScrollLink>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 sm:justify-start">
          <h6 className="uppercase font-bold text-light-gray tracking-tight">
            Project
          </h6>
          <Link href={GITHUB}>
            <Image
              src="/images/white-github-logo.svg"
              height={30}
              width={30}
              alt="Github Logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

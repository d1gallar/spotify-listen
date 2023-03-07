"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-w-[260px] flex flex-row items-center justify-center bg-black w-screen h-screen">
      <div className="w-full h-fit mx-6 flex flex-col items-center justify-center xsm:mx-20 sm:w-1/2 lg:w-1/3">
        <div className="w-full h-fit flex flex-row justify-center items-start mb-14 md:mb-20">
          <Link
            href="/"
            className="w-full flex h-fit flex-row items-center justify-center gap-2"
          >
            <Image
              className="w-full sm:w-2/3"
              src="/images/white-spotify-listen-logo.svg"
              height={120}
              width={120}
              alt="Spotify Logo"
              priority
              draggable={false}
            />
          </Link>
        </div>
        <div className="mb-14 lg:mb-20">
          <h2 className="text-3xl font-circular font-bold tracking-tight text-white text-center sm:text-4xl lg:text-5xl">
            Let's find out what you're listening to!
          </h2>
        </div>
        <>
          <button
            className="w-full bg-spotify-green font-circular text-white font-bold tracking-wide uppercase py-3 rounded-full max-w-md brightness-95 hover:brightness-100 active:brightness-100"
            onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
          >
            <span>Login</span>
          </button>
        </>
      </div>
    </div>
  );
}

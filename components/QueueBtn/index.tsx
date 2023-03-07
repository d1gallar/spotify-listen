"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import "./QueueBtn.css";

export default function QueueBtn() {
  const pathname = usePathname();
  const router = useRouter();
  const isOnQueuePage = "/queue" === pathname;
  return (
    <button
      className={`relative flex flex-row justify-center items-center w-8 h-8 min-w-8 max-w-8 border-none bg-transparent ${
        !isOnQueuePage
          ? "opacity-80 hover:opacity-100"
          : "green-circle opacity-90 hover:opacity-100"
      }`}
      onClick={() => {
        if (isOnQueuePage) router.back();
        router.push("/queue");
      }}
    >
      {isOnQueuePage ? (
        <Image
          src="/images/green-song-queue-icon.svg"
          width={16}
          height={16}
          alt="Queue Icon"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/white-song-queue-icon.svg"
          width={16}
          height={16}
          alt="Queue Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

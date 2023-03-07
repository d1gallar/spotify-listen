"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NextPageBtn() {
  const router = useRouter();
  return (
    <button
      className="flex flex-row justify-center items-center min-w-[32px] max-w-[32px] h-[32px] bg-[#000000dd] border-none rounded-[50%]"
      onClick={() => router.forward()}
    >
      <Image
        src="/images/white-chevron-right-icon.svg"
        alt="Back Icon"
        width={16}
        height={16}
        draggable={false}
      />
    </button>
  );
}

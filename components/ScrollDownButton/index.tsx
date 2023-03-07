"use client";

import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import useHover from "@/hooks/Hover";

export default function ScrollDownButton() {
  const { isHover, eventHandlers } = useHover();
  return (
    <ScrollLink
      activeClass="active"
      to="getting-started"
      spy={true}
      smooth={true}
      duration={500}
      {...eventHandlers}
      className="cursor-pointer bg-transparent border-2 border-[#19141433] rounded-full h-fit w-fit p-3 scale-90 transition duration-150 ease-in-out hover:bg-black hover:scale-100"
    >
      {isHover ? (
        <Image
          src="/images/white-arrow-down.svg"
          alt="Arrow Down"
          width="24"
          height="24"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/black-arrow-down.svg"
          alt="Arrow Down"
          width="24"
          height="24"
          draggable={false}
        />
      )}
    </ScrollLink>
  );
}

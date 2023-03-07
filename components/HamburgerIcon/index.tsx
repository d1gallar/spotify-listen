"use client";

import { useState } from "react";
import "./Hamburger.css";

type HamburgerIconProps = {
  collapse: boolean;
  setCollapse: (isCollapsed: boolean) => void;
};

export default function HamburgerIcon({ collapse, setCollapse }: HamburgerIconProps) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsActive(!isActive);
    setCollapse(!collapse);
  };
  return (
    <div className="flex flex-row justify-center items-center">
      <button
        id="hamburger"
        className={isActive ? "open" : "w-full"}
        onClick={(e) => handleClick(e)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}

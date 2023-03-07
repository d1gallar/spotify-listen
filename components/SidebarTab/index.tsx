import Link from "next/link";
import { ReactNode } from "react";

type SidebarTabProps = {
  active: boolean;
  href: string;
  label: string;
  children: ReactNode | ReactNode[];
};

export default function SidebarTab(props: SidebarTabProps) {
  return (
    <Link
      className={`w-full h-[40px] flex flex-row justify-start items-center px-6 gap-4 ${
        props.active ? "opacity-100" : "opacity-70 hover:opacity-100"
      }`}
      href={props.href}
    >
      {props.children}
      <span className="font-circular text-sm font-bold tracking-tight text-white overflow-hidden text-ellipsis whitespace-nowrap">
        {props.label}
      </span>
    </Link>
  );
}

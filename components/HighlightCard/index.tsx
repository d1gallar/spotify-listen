import { ReactNode } from "react";

export default function HighightCard(props: {
  children?: ReactNode | ReactNode[];
  className?: string;
}) {
  return (
    // <div className={`min-w-[280px] max-w-[280px] w-[280px] h-full flex flex-col p-4 gap-4 rounded-lg ${props.className}`}>
    <div
      className={`min-w-[280px] w-full h-full flex flex-col p-4 gap-4 rounded-lg ${props.className}`}
    >
      {props.children}
    </div>
  );
}

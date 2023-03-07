import { ReactNode } from "react";

export default function HighlightContainer(props: {
  children?: ReactNode | ReactNode[];
}) {
  return (
    <div className="w-full min-w-[486px] h-fit">
      <div className="w-full h-full flex flex-row justify-between items-start  gap-4 overflow-x-scroll overflow-y-hidden">
        {props.children}
      </div>
    </div>
  );
}

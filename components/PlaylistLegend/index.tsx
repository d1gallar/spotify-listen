import Image from "next/image";
import "./PlaylistLegend.css";

export default function PlaylistLegend() {
  return (
    <div className="h-[32px] sticky border-b border-solid border-[#FFFFFF11] mb-6 flex flex-row px-6">
      <div className="grid top-song-legend-grid gap-4">
        <div
          role-header="column-header"
          aria-colindex={1}
          className="flex flex-row items-center"
        >
          <span className="font-circular text-base tracking-tight text-[#B3B3B3] font-bold">
            #
          </span>
        </div>
        <div
          role-header="column-header"
          aria-colindex={2}
          className="flex flex-row items-center min-w-[120px]"
        >
          <span className="font-circular text-xs tracking-tight text-[#B3B3B3] font-400 uppercase">
            Title
          </span>
        </div>
        <div
          role-header="column-header"
          aria-colindex={3}
          className="flex flex-row items-center min-w-[56px]"
        >
          <span className="font-circular text-xs tracking-tight text-[#B3B3B3] font-400 uppercase">
            Album
          </span>
        </div>
        <div
          role-header="column-header"
          aria-colindex={3}
          className="flex flex-row items-center min-w-[56px]"
        >
          <span className="font-circular text-xs tracking-tight text-[#B3B3B3] font-400 uppercase">
            Date Added
          </span>
        </div>
        <div
          role-header="column-header"
          aria-colindex={5}
          className="flex flex-row items-center justify-center min-w-[28px]"
        >
          <span>
            <Image
              src="/images/gray-clock-icon.svg"
              width={16}
              height={16}
              alt="Clock Icon"
              draggable={false}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

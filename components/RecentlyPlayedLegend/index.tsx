import Image from "next/image";
import "./RecentlyPlayedLegend.css";

export default function RecentlyPlayedLegend() {
  return (
    <div className="h-[32px] sticky border-b border-solid border-[#FFFFFF11] mb-6 flex flex-row px-6">
      <div className="grid recently-played-grid gap-4">
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
          aria-colindex={5}
          className="flex flex-row items-center min-w-[28px]"
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
        <div
          role-header="column-header"
          aria-colindex={4}
          className="flex items-center justify-self-center"
        >
          <span className="font-circular text-xs tracking-tight text-[#B3B3B3] font-400 uppercase">
            Played At
          </span>
        </div>
      </div>
    </div>
  );
}

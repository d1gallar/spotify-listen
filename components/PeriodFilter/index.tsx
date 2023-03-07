import Image from "next/image";
import { createRef, ReactNode, useState } from "react";
import useOnClickOutside from "@/hooks/OnClickOutside";
import { useTimePeriod } from "@/hooks/TimePeriod";
import { TimeRange } from "@/types/spotify";

type PeriodTabProps = {
  children: ReactNode | ReactNode[];
  value: TimeRange;
  close: () => void;
};

export function PeriodTab(props: PeriodTabProps) {
  const { timePeriod, setTimePeriod } = useTimePeriod();
  const isActive = timePeriod === props.value;
  const selectPeriod = () => {
    setTimePeriod(props.value);
    props.close();
  };

  return (
    <button
      className={`w-full h-fit p-3 flex flex-row justify-between ${
        isActive
          ? "text-spotify-green"
          : "text-white opacity-80 hover:opacity-100"
      }`}
      onClick={selectPeriod}
    >
      {props.children}
      {isActive && (
        <Image
          src="/images/green-checkmark-icon.svg"
          width={20}
          height={20}
          alt="Checkmark Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

export default function PeriodFilter() {
  const clickOutsideRef = createRef<HTMLDivElement>();
  const [isFilterOpen, setFilterOpen] = useState(false);

  const closeFilter = () => {
    setFilterOpen(false);
  };

  useOnClickOutside(clickOutsideRef, closeFilter);

  return (
    <div
      className="relative flex flex-row justify-between gap-2"
      ref={clickOutsideRef}
    >
      {isFilterOpen && (
        <div className="absolute right-0 top-10 shadow-sm rounded-xl overflow-y-scroll min-w-[160px] max-w-[350px] h-fit bg-[#282828] p-2 z-50">
          <p className="font-circular text-xs tracking-tighter font-medium px-3 pt-3 pb-1 text-[#ffffff86]">
            Sort By
          </p>
          <PeriodTab value={"short_term"} close={closeFilter}>
            <span className="font-circular text-sm tracking-tighter font-medium">
              Month
            </span>
          </PeriodTab>
          <PeriodTab value={"medium_term"} close={closeFilter}>
            <span className="font-circular text-sm tracking-tighter font-medium">
              6 Months
            </span>
          </PeriodTab>
          <PeriodTab value={"long_term"} close={closeFilter}>
            <span className="font-circular text-sm tracking-tighter font-medium">
              All Time
            </span>
          </PeriodTab>
        </div>
      )}
      <button
        className="flex flex-row items-center justify-start gap-2"
        onClick={() => setFilterOpen(!isFilterOpen)}
      >
        <Image
          src="/images/white-arrow-switch-icon.svg"
          width={20}
          height={20}
          alt="Switch Icon"
          draggable={false}
        />
        <span className="font-circular text-white text-center text-xs font-bold tracking-tight">
          Filter
        </span>
      </button>
    </div>
  );
}

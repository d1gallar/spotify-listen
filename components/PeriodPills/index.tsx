import { ReactNode } from "react";
import { useTimePeriod } from "@/hooks/TimePeriod";
import { TimeRange } from "@/types/spotify";

// Note: not connected!
type PeriodPillProps = {
  children: ReactNode | ReactNode[];
  value: TimeRange;
};

export function PeriodPill(props: PeriodPillProps) {
  const { timePeriod, setTimePeriod } = useTimePeriod();
  const isActive = timePeriod === props.value;
  return (
    <button
      className={`font-circular text-center text-xs font-bold tracking-tight px-3 py-1 border-[1px] rounded-full opacity-80 ${
        isActive
          ? "bg-spotify-green text-black border-spotify-green !opacity-100"
          : "bg-transparent text-white border-[#FFFFFFbb] hover:opacity-100"
      }`}
      onClick={() => setTimePeriod(props.value)}
    >
      {props.children}
    </button>
  );
}

export default function PeriodPillSelector() {
  return (
    <div
      className="relative flex flex-row justify-between gap-2"
    >
      <PeriodPill value="short_term">
        Month
      </PeriodPill>
      <PeriodPill value="medium_term">
        6 Months
      </PeriodPill>
      <PeriodPill value="long_term">
        All Time
      </PeriodPill>
    </div>
  );
}

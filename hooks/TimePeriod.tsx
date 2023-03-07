import { TimeRange } from "@/types/spotify";
import { createContext, ReactNode, useContext, useState } from "react";

type TimePeriodContextType = {
  timePeriod: TimeRange;
  setTimePeriod: (period: TimeRange) => void;
} | null;

const TimePeriodContext = createContext<TimePeriodContextType>(null);

export default function TimePeriodProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [timePeriod, setTimePeriod] = useState<TimeRange>("medium_term");

  return (
    <TimePeriodContext.Provider value={{ timePeriod, setTimePeriod }}>
      {children}
    </TimePeriodContext.Provider>
  );
}

export function useTimePeriod() {
  const timePeriodContext = useContext(TimePeriodContext);
  if (!timePeriodContext) {
    throw new Error(
      "useTimePeriod must be used within the TimePeriodContext.Provider"
    );
  }
  return timePeriodContext;
}

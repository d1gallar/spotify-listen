"use client";

import { ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import useRefreshToken from "@/hooks/RefreshToken";
import { useTimePeriod } from "@/hooks/TimePeriod";
import MainContainer from "@/components/MainContainer";
import { TimeRange } from "@/types/spotify";

export default function Settings() {
  useRefreshToken();
  const timePeriodContext = useTimePeriod();
  if (!timePeriodContext) return null;
  const { timePeriod, setTimePeriod } = timePeriodContext;
  const timePeriodHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPeriod = e.target.value as TimeRange;
    setTimePeriod(selectedPeriod);
  };

  return (
    <MainContainer>
      <div className="flex flex-col gap-8">
        <h3 className="font-circular text-white font-semibold tracking-tight">
          Settings
        </h3>
        <div className="flex flex-col gap-3">
          <h5 className="font-circular text-white font-semibold tracking-tight">
            Time Period
          </h5>
          <div className="flex flex-row justify-between">
            <p className="font-circular text-sm text-light-gray font-semibold tracking-tight">
              Choose a time frame view your personal stats.
            </p>
            <select
              name="period"
              id="period"
              className="bg-[#333333] px-2 py-1 text-sm rounded-sm font-circular text-light-gray tracking-tight font-medium outline-none"
              value={timePeriod}
              onChange={(e) => timePeriodHandler(e)}
            >
              <option value="short_term">Last 4 weeks</option>
              <option value="medium_term">Last 6 months</option>
              <option value="long_term">All Time</option>
            </select>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

"use client";
import { useSession } from "next-auth/react";
import { RecentlyPlayedProvider } from "@/hooks/RecentlyPlayed";
import useRefreshToken from "@/hooks/RefreshToken";
import HomeHighlights from "@/components/HomeHighlights";
import MainContainer from "@/components/MainContainer";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import { HeaderSkeleton } from "@/components/Skeletons";
import PeriodFilter from "@/components/PeriodFilter";

export default function DashboardHome() {
  const { data: session } = useSession();
  useRefreshToken();
  const name = session?.user.name;

  return (
    <MainContainer>
      <div className="w-full flex flex-row justify-between">
        {name ? (
          <h3 className="font-circular text-white font-semibold tracking-tight">
            {`Welcome, ${name}!`}
          </h3>
        ) : (
          <HeaderSkeleton />
        )}
        <PeriodFilter />
      </div>
      <HomeHighlights />
      <RecentlyPlayedProvider>
        <RecentlyPlayed />
      </RecentlyPlayedProvider>
    </MainContainer>
  );
}

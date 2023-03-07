import MainContainer from "@/components/MainContainer";
import { HeaderSkeleton, HomeHighlightSkeleton, RecentlyPlayedSkeleton } from "@/components/Skeletons";

export default function DashboardLoading() {
  return (
    <MainContainer>
      <HeaderSkeleton />
      <HomeHighlightSkeleton />
      <RecentlyPlayedSkeleton />
    </MainContainer>
  );
}
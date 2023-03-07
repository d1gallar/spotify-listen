import useRecentlyPlayed from "@/hooks/RecentlyPlayed";
import RecentlyPlayedLegend from "../RecentlyPlayedLegend";
import RecentlyPlayedTracks from "../RecentlyPlayedTracks";
import { RecentlyPlayedSkeleton } from "../Skeletons";

export default function RecentlyPlayed() {
  const { recentTracks, likedArr, recentTrackUris, recentTrackIds, recentlyPlayedData} =
    useRecentlyPlayed();

  if (
    !recentlyPlayedData || 
    !recentTracks ||
    !likedArr ||
    !recentTrackUris ||
    !recentTrackIds ||
    recentTracks.length === 0 ||
    likedArr.length === 0 ||
    recentTrackIds.length === 0 ||
    recentTrackUris.length === 0
  )
    return <RecentlyPlayedSkeleton />;

  return (
    <div className="bg-[#181818] flex flex-col h-full w-full p-6 rounded-lg gap-6 min-w-[486px]">
      <h4 className="w-full font-circular text-white font-semibold tracking-[-0.04em]">
        Recently Played
      </h4>
      <div className="w-full">
        <RecentlyPlayedLegend />
        <RecentlyPlayedTracks playlistName={"Recently Played"} />
      </div>
    </div>
  );
}

"use client";

import useRefreshToken from "@/hooks/RefreshToken";
import TopTracksProvider from "@/hooks/TopTracks";
import TopTracksInner from "@/components/TopTracksInner";

export default function TopSongs() {
  useRefreshToken();
  return (
    <TopTracksProvider>
      <TopTracksInner />
    </TopTracksProvider>
  )
}

"use client";
import useRefreshToken from "@/hooks/RefreshToken";
import SavedTracksProvider from "@/hooks/SavedTracks";
import LikedInner from "@/components/LikedInner";

export default function LikedSongs() {
  useRefreshToken();
  return (
    <SavedTracksProvider>
      <LikedInner />
    </SavedTracksProvider>
  );
}

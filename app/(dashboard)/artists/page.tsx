"use client";
import useRefreshToken from "@/hooks/RefreshToken";
import { useTopItems } from "@/hooks/TopItems";
import AllTopArtists from "@/components/AllTopArtists";
import ArtistHighlights from "@/components/ArtistHighlights";
import MainContainer from "@/components/MainContainer";
import { Artists } from "@/types/spotify";
import ArtistLoading from "./loading";

export default function TopArtists() {
  useRefreshToken();

  const { topItems: topArtists, isLoading } = useTopItems({
    type: "artists",
    limit: 50,
  });

  if (!topArtists || !topArtists.items || isLoading) return <ArtistLoading />;
  const artists = topArtists.items as Artists;
  const highlighArtists = artists.slice(0, 3);

  return (
    <MainContainer>
      <div className="flex flex-row justify-between">
        <h3 className="font-circular text-white font-semibold tracking-tight">
          Top Artists
        </h3>
      </div>
      <ArtistHighlights artists={highlighArtists} />
      <h4 className="font-circular text-white font-semibold tracking-tight">
        All Artists
      </h4>
      <AllTopArtists artists={artists} />
    </MainContainer>
  );
}

import MainContainer from "@/components/MainContainer";
import {
  ArtistHighlightSkeleton,
  HeaderSkeleton,
  TopArtistSkeleton,
} from "@/components/Skeletons";

export default function ArtistLoading() {
  return (
    <MainContainer>
      <HeaderSkeleton />
      <ArtistHighlightSkeleton />
      <div className="mt-8"></div>
      <HeaderSkeleton />
      <TopArtistSkeleton />
    </MainContainer>
  );
}

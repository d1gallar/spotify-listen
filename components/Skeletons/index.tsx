import HighlightCard from "../HighlightCard";
import HighlightContainer from "../HighlightContainer";

export function TrackSkeleton() {
  return (
    <div className="grid song-list-grid gap-4">
      <div className="w-full bg-[#3e3e3e] animate-pulse h-[3vh] mb-6 rounded-full"></div>
      <div className="w-full bg-[#3e3e3e] animate-pulse h-[3vh] mb-6 rounded-full"></div>
      <div className="w-full bg-[#3e3e3e] animate-pulse h-[3vh] mb-6 rounded-full"></div>
      <div className="w-full bg-[#3e3e3e] animate-pulse h-[3vh] mb-6 rounded-full"></div>
      <div className="w-full bg-[#3e3e3e] animate-pulse h-[3vh] mb-6 rounded-full"></div>
    </div>
  );
}

export function HighlightSkeleton() {
  return (
    <HighlightCard className="bg-[#1b1b1b] min-h-[20vh] w-full shadow-sm">
      <div className="w-full h-full flex flex-row justify-between gap-4 overflow-clip">
        <div className="min-w-[150px] min-h-[150px] bg-[#3e3e3e] animate-pulse rounded-md animate-skeleton"></div>
        <div className="w-full h-full flex flex-col justify-start gap-3">
          <div className="w-full bg-[#3e3e3e] animate-pulse h-[3vh] rounded-full"></div>
          <div className="w-2/3 bg-[#3e3e3e] animate-pulse h-[3vh] rounded-full"></div>
        </div>
      </div>
    </HighlightCard>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="w-1/3 bg-[#3e3e3e] animate-pulse h-[4vh] mb-6 rounded-full"></div>
  );
}

export function HomeHighlightSkeleton() {
  return (
    <HighlightContainer>
      <HighlightSkeleton />
      <HighlightSkeleton />
    </HighlightContainer>
  );
}

export function RecentlyPlayedSkeleton() {
  return (
    <div className="w-full h-fit bg-[#1b1b1b] mt-8 shadow-sm rounded-lg p-5 gap-4">
      <HeaderSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
      <TrackSkeleton />
    </div>
  );
}

export function ArtistHighlightSkeleton() {
  return (
    <HighlightContainer>
      <HighlightSkeleton />
      <HighlightSkeleton />
      <HighlightSkeleton />
    </HighlightContainer>
  );
}

export function ArtistCardSkeleton() {
  return (
    <div className="relative min-w-[200px] w-full h-auto flex flex-col gap-4 bg-[#252525] p-4 rounded-md">
      <div className="min-w-[150px] min-h-[150px] w-full h-auto bg-[#3e3e3e] animate-pulse"></div>
      <div className="w-full h-[2vh] rounded-full bg-[#3e3e3e] animate-pulse"></div>
    </div>
  );
}

export function TopArtistSkeleton() {
  const CARD_GRID_DEFAULT = 25;
  return (
    <div className="grid artist-grid gap-5">
      {Array(CARD_GRID_DEFAULT)
        .fill(true)
        .map((x, i) => (
          <ArtistCardSkeleton key={i} />
        ))}
    </div>
  );
}

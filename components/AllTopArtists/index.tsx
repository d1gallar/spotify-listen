import ArtistCard from "../ArtistCard";
import { TopArtistSkeleton } from "../Skeletons";
import { Artists, Artist } from "@/types/spotify";
import "./AllTopArtists.css";

type AllTopArtistsProps = {
  artists: Artists;
};

export default function AllTopArtists(props: AllTopArtistsProps) {
  if (!props.artists) return <TopArtistSkeleton />;
  return (
    <div className="grid artist-grid gap-5">
      {props.artists.map((artist: Artist, i: number) => {
        return <ArtistCard artist={artist} rank={i + 1} key={artist.id} />;
      })}
    </div>
  );
}

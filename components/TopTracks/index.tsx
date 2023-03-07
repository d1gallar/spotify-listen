import { Tracks } from "@/types/spotify";
import TopTracksLegend from "../TopTracksLegend";
import TopTrack from "../TopTrack";

type TopTracksProps = {
  tracks: Tracks;
  likedArr: boolean[];
  playlistName: string;
};

export default function TopTracks(props: TopTracksProps) {
  return (
    <div className="w-full h-fit flex-col">
      <TopTracksLegend />
      <div className="w-full flex-col">
        {props.tracks.map((track, i) => {
          const isLiked = props.likedArr[i];
          return (
            <TopTrack
              key={track.id}
              rank={i + 1}
              imgSrc={track.album.images[0].url}
              trackName={track.name}
              trackHref={track.external_urls.spotify}
              artists={track.artists}
              albumName={track.album.name}
              albumHref={track.album.external_urls.spotify}
              duration={track.duration_ms}
              isLiked={isLiked}
              uri={track.uri}
              id={track.id}
              albumId={track.album.id}
              playlistName={props.playlistName}
            />
          );
        })}
      </div>
    </div>
  );
}

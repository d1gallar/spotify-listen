import RecentlyPlayedTrack from "../RecentlyPlayedTrack";
import { RecentlyPlayedItem } from "@/types/spotify";
import { formatDuration, makeid } from "@/util/util";
import useRecentlyPlayed from "@/hooks/RecentlyPlayed";

type RecentlyPlayedTracksProps = {
  playlistName: string;
};

export default function RecentlyPlayedTracks(props: RecentlyPlayedTracksProps) {
  const {recentTracks, likedArr} = useRecentlyPlayed();
  return (
    <>
      {recentTracks.map((item, i) => {
        const duration = formatDuration(item.track.duration_ms);
        const trackHref = item.track.external_urls.spotify;
        const albumHref = item.track.album.external_urls.spotify;
        const playedAt = item.played_at;
        const key = makeid(10); // creates uid => may have duplicate tracks ids
        const isLiked = likedArr[i];
        return (
          <RecentlyPlayedTrack
            key={key}
            rank={i + 1}
            imgSrc={item.track.album?.images[0].url || ""}
            trackName={item.track.name}
            trackHref={trackHref || "X"}
            artists={item.track.artists}
            albumName={item.track.album?.name || ""}
            albumHref={albumHref || "X"}
            duration={duration}
            playedAt={playedAt}
            isLiked={isLiked}
            id={item.track.id}
            uri={item.track.uri}
            albumId={item.track.album.id}
            playlistName={props.playlistName}
          />
        );
      })}
    </>
  );
}

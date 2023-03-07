"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useSavedTracks } from "@/hooks/SavedTracks";
import PlaylistContainer from "@/components/PlaylistContainer";
import PlaylistControls from "@/components/PlaylistControls";
import PlaylistLegend from "@/components/PlaylistLegend";
import PlaylistTop from "@/components/PlaylistTop";
import PlaylistTrack from "@/components/PlaylistTrack";
import { makeid } from "@/util/util";
import { Tracks } from "@/types/spotify";

export default function LikedInner() {
  const {
    allSavedTracks,
    savedTrackData,
    likedArr,
    hasNextPage,
    getDebouncedNextPage,
    savedUris,
  } = useSavedTracks();

  if (
    !savedTrackData ||
    !allSavedTracks ||
    !likedArr ||
    !savedUris ||
    savedUris.length === 0
  )
    return null;
  const tracks = allSavedTracks.map((item) => item.track) as unknown as Tracks;
  const playlistName = "Liked Songs";
  return (
    <div className="bg-[#121212] h-full">
      <InfiniteScroll
        className="w-full px-8 py-8 overflow-y-scroll"
        dataLength={allSavedTracks.length}
        next={getDebouncedNextPage}
        hasMore={hasNextPage}
        loader={null}
        height={"100vh"}
      >
        <div className="w-full h-fit min-w-[720px]">
          <div className="w-full max-h-[200px]">
            <PlaylistTop
              collaborative={false}
              followerTotal={0}
              image={"images/liked-songs-cover.svg"}
              name={"My Liked Songs"}
              public={false}
              playlistLength={savedTrackData.total}
              gradient={"from-[#5D4DAB] to-[#121212]"}
            />
            <PlaylistContainer>
              <PlaylistControls
                trackUris={savedUris}
                playlistName={"Liked Songs"}
                tracks={tracks}
              />
              <PlaylistLegend />
              {allSavedTracks.map((track, i) => {
                const key = makeid(10);
                const isLiked = likedArr[i];
                return (
                  <PlaylistTrack
                    key={key}
                    rank={i + 1}
                    imgSrc={track.track.album.images[0].url}
                    trackName={track.track.name}
                    trackHref={track.track.external_urls.spotify}
                    artists={track.track.artists}
                    albumName={track.track.album.name}
                    albumHref={track.track.album.external_urls.spotify}
                    duration={track.track.duration_ms}
                    addedAt={track.added_at}
                    isLiked={isLiked}
                    uri={track.track.uri}
                    id={track.track.id}
                    albumId={track.track.album.id}
                    isSavedPlaylist={true}
                    playlistName={playlistName}
                    tracks={tracks}
                    trackUris={savedUris}
                  />
                );
              })}
            </PlaylistContainer>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

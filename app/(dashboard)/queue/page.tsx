"use client";
import { useEffect } from "react";
import { usePlayback } from "@/hooks/Playback";
import useRefreshToken from "@/hooks/RefreshToken";
import MainContainer from "@/components/MainContainer";
import PlaylistTrack from "@/components/PlaylistTrack";
import { Track, Tracks } from "@/types/spotify";
import { makeid } from "@/util/util";

export default function Queue() {
  useRefreshToken();
  const { queue, fetchQueue } = usePlayback();

  useEffect(() => {
    fetchQueue();
  }, []);

  let currentTrack: Track | null = null;
  let nextQueue: Tracks = [];
  let nextQueueUris: string[] = [];
  let similarSong = false;
  if (queue && queue.currently_playing) {
    currentTrack = queue.currently_playing as Track;
    nextQueue = queue.queue;
    nextQueueUris = queue.queue.map((track) => track.uri);
    similarSong =
      nextQueue.filter(
        (track) => track.id === (currentTrack as unknown as Track).id
      ).length === 0;
  }
  return (
    <MainContainer>
      <div className="flex flex-col gap-8">
        <h3 className="font-circular text-white font-semibold tracking-tight">
          Queue
        </h3>
        {currentTrack && similarSong && nextQueue && (
          <>
            <div className="flex flex-col gap-2">
              <p className="font-circular text-light-gray text-sm font-semibold tracking-tight">
                Now Playing
              </p>
              <PlaylistTrack
                key={makeid(10)}
                rank={1}
                imgSrc={currentTrack.album.images[0].url}
                trackName={currentTrack.name}
                trackHref={currentTrack.external_urls.spotify}
                artists={currentTrack.artists}
                albumName={currentTrack.album.name}
                albumHref={currentTrack.album.external_urls.spotify}
                duration={currentTrack.duration_ms}
                isLiked={false}
                id={currentTrack.id}
                uri={currentTrack.uri}
                isPlaying={true}
                albumId={currentTrack.album.id}
                playlistName={"queue"}
                tracks={[currentTrack]}
                trackUris={[currentTrack.uri]}
              />
            </div>
            <div className="w-full h-fit">
              <p className="font-circular text-light-gray text-sm font-semibold tracking-tight mb-2">
                Next in Playlist
              </p>
              <div className="w-full h-fit flex flex-col">
                {nextQueue.map((track, i) => {
                  return (
                    <PlaylistTrack
                      key={makeid(10)}
                      rank={i + 2}
                      imgSrc={track.album.images[0].url}
                      trackName={track.name}
                      trackHref={track.external_urls.spotify}
                      artists={track.artists}
                      albumName={track.album.name}
                      albumHref={track.album.external_urls.spotify}
                      duration={track.duration_ms}
                      isLiked={false}
                      id={track.id}
                      uri={track.uri}
                      isPlaying={false}
                      albumId={track.album.id}
                      playlistName={"queue"}
                      tracks={nextQueue}
                      trackUris={nextQueueUris}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </MainContainer>
  );
}

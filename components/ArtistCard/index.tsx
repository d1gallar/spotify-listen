"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCurrentTrack } from "@/hooks/CurrentTrack";
import { usePlayback } from "@/hooks/Playback";
import useSpotify from "@/hooks/Spotify";
import useHover from "@/hooks/Hover";
import {
  Artist,
  CurrentlyPlayingTrack,
  Playback,
  Tracks,
} from "@/types/spotify";
import { usePopUpToggle } from "@/hooks/PopUpToggle";

type ArtistCardProps = {
  artist: Artist;
  rank: number;
};

export default function ArtistCard(props: ArtistCardProps) {
  const { currentTrack, setCurrentTrackId } = useCurrentTrack();
  const { isPlaying, setIsPlaying } = usePlayback();
  const {setShowPopUp} = usePopUpToggle();
  const spotifyWebApi = useSpotify();

  const [artistMatch, setArtistMatch] = useState(false);

  const { isHover, eventHandlers } = useHover();
  const { onMouseOut, onMouseOver } = eventHandlers;
  if (!props.artist) return null;

  const playArtistSong = async () => {
    let artistMatchCheck = false;
    currentTrack?.artists.map((artist) => {
      if (artist.id === props.artist.id) artistMatchCheck = true;
    });
    setArtistMatch(artistMatchCheck);

    spotifyWebApi.getMyCurrentPlaybackState().then((res) => {
      const playbackResponse = res.body as unknown as Playback;

      // Checks if device is active
      if (
        !playbackResponse ||
        !playbackResponse.device ||
        !playbackResponse.device.is_active
      ) {
        setShowPopUp({
          addLiked: false,
          removeLiked: false,
          createdPlaylist: false,
          copySongLink: false,
          copySongUri: false,
          noDevice: true,
        });
        setCurrentTrackId("");
        return;
      }

      // resumes current track if the song matches the artist,
      //  otherwise play any song by the artist
      if (artistMatchCheck) {
        spotifyWebApi
          .getMyCurrentPlayingTrack()
          .then((res) => {
            const currentTrackData =
              res.body as unknown as CurrentlyPlayingTrack;
            const currentTrackOffset = currentTrackData.progress_ms;
            const trackUri = currentTrackData.item.uri;
            spotifyWebApi
              .play({
                uris: [trackUri],
                position_ms: Number(currentTrackOffset),
              })
              .then((res) => {
                setCurrentTrackId(currentTrackData.item.id);
                setIsPlaying(true);
                setArtistMatch(true);
              });
          })
          .catch();
      } else {
        spotifyWebApi
          .getArtistTopTracks(props.artist.id, "ES")
          .then((res) => {
            const artistTracks = res.body.tracks as unknown as Tracks;
            const firstSong = artistTracks[0];
            spotifyWebApi
              .play({ context_uri: props.artist.uri })
              .then((res) => {
                setCurrentTrackId(firstSong.id);
                setIsPlaying(true);
                setArtistMatch(true);
              });
          })
          .catch();
      }
    });
  };

  const pause = () => {
    spotifyWebApi.pause().then((res) => res.body);
    setIsPlaying(false);
    setArtistMatch(false);
  };

  const togglePlayArtist = () => {
    if (artistMatch && isPlaying) {
      pause();
    } else {
      playArtistSong();
    }
  };

  useEffect(() => {
    let artistMatch = false;
    currentTrack?.artists.map((artist) => {
      if (artist.id === props.artist.id) artistMatch = true;
    });
    setArtistMatch(artistMatch);
  }, [currentTrack]);

  return (
    <div
      className="relative min-w-[200px] w-full h-auto flex flex-col gap-4 bg-[#252525] p-4 rounded-md hover:bg-[#292929]"
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
    >
      <a
        href={props.artist.external_urls.spotify}
        target="_blank"
        className="w-full pb-[100%] relative hover:cursor-pointer"
      >
        <Image
          className="absolute top-0 bottom-0 w-full h-full object-cover object-center"
          src={props.artist.images[0].url}
          width={150}
          height={150}
          draggable={false}
          alt={props.artist.name}
        />
      </a>
      <div className="flex flex-row justify-start gap-2 items-center">
        <a
          className="font-circular text-white font-semibold tracking-tight text-sm hover:cursor-pointer hover:underline"
          href={props.artist.external_urls.spotify}
          target="_blank"
        >
          {`${props.rank}. ${props.artist.name} `}
        </a>
      </div>

      <div className="absolute bottom-10 right-2">
        <button
          className={`flex flex-row justify-center items-center bg-spotify-green rounded-full w-10 h-10 shadow-lg ${
            isHover || artistMatch
              ? "animate-fadeUp opacity-100"
              : "animate-fadeOut opacity-0"
          }`}
          onClick={() => togglePlayArtist()}
        >
          {artistMatch && isPlaying ? (
            <Image
              src="/images/black-song-pause-icon.svg"
              alt="Play Artist Button"
              width={20}
              height={20}
              draggable={false}
            />
          ) : (
            <Image
              src="/images/black-song-play-icon.svg"
              alt="Play Artist Button"
              width={20}
              height={20}
              draggable={false}
            />
          )}
        </button>
      </div>
    </div>
  );
}

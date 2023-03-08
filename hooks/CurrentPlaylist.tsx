import { Device, Playback, Track, Tracks } from "@/types/spotify";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCurrentTrack } from "./CurrentTrack";
import { usePlayback } from "./Playback";
import { usePopUpToggle } from "./PopUpToggle";
import useSpotify from "./Spotify";

type CurrentPlaylistContextType = {
  currentPlaylist: string;
  playlistUris: string[];
  playlistTrackIds: string[];
  setCurrentPlaylist: (playlist: string) => void;
  matchesCurrentPlaylist: (playlist: string) => boolean;
  playPlaylist: (
    playlist: string,
    trackUris: string[],
    tracks: Tracks,
    position?: number
  ) => void;
  playlistIndex: number;
} | null;

const CurrentPlaylistContext = createContext<CurrentPlaylistContextType>(null);

export default function CurrentPlaylistProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const spotifyWebApi = useSpotify();
  const { setShowPopUp } = usePopUpToggle();
  const { setIsPlaying, setDevice } = usePlayback();
  const { setCurrentTrackId, currentTrack, setCurrentTrack } =
    useCurrentTrack();
  const { playTrack } = usePlayback();

  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState<Tracks>([]);
  const [playlistUris, setPlaylistUris] = useState<string[]>([]);
  const [playlistTrackIds, setPlaylistTrackIds] = useState<string[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  const matchesCurrentPlaylist = (playlist: string) => {
    return currentPlaylist === playlist;
  };

  const playPlaylist = (
    playlist: string,
    trackUris: string[],
    tracks: Tracks,
    position: number = 0
  ) => {
    if (position < 0) return;

    spotifyWebApi.getMyCurrentPlaybackState().then((res) => {
      const playbackResponse = res.body as unknown as Playback;
      // Checks if device is active
      if (
        playbackResponse === null ||
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
        return;
      }

      // Slices the track uris if given an offset position
      if (position !== 0 && position > 0) {
        setPlaylistUris(trackUris); // want to give the full playlist uri
        trackUris = trackUris.slice(position);
      }
      const allTrackIds = tracks.map((track) => track.id);

      if (playbackResponse.shuffle_state) {
        playTrack(tracks[position].id, trackUris[0]);
        setPlaylistIndex(position);
        setPlaylistTrackIds(allTrackIds);
        setPlaylistTracks(tracks);
        setCurrentPlaylist(playlist);
        setIsPlaying(true);
        setCurrentTrackId(tracks[position].id);
      } else {
        spotifyWebApi
          .play({ uris: trackUris })
          .then(async () => {
            setCurrentPlaylist(playlist);
            setPlaylistTrackIds(allTrackIds);
            setPlaylistTracks(tracks);
            setIsPlaying(true);
            setPlaylistIndex(position);
            setCurrentTrackId(tracks[position].id);
          })
          .catch();
      }
    });
  };

  const fetchCurrentPlayback = () => {
    spotifyWebApi.getMyCurrentPlaybackState().then((res) => {
      const playbackResponse = res.body as unknown as Playback;
      if(playbackResponse === null) return;
      const playbackCurrentTrack = playbackResponse.item as Track;

      // checks the player is playing and there is a device
      setIsPlaying(playbackResponse.is_playing);
      setDevice(playbackResponse.device);

      // changing playlist position and current song if there is no context
      if (
        !playbackResponse.context &&
        playbackResponse.currently_playing_type === "track" &&
        playbackResponse.item.id !== currentTrack?.id &&
        playlistIndex + 1 <= playlistTracks.length &&
        playbackCurrentTrack.uri === playlistUris[playlistIndex + 1]
      ) {
        setPlaylistIndex(playlistIndex + 1);
        setCurrentTrackId(playbackCurrentTrack.id);
      }

      // If the playback context changes, make sure to update the playlist name
      if (playbackResponse.context) {
        setCurrentPlaylist(playbackResponse.context.uri);
        setPlaylistUris([playbackResponse.context.uri]);
      }
    });
  };

  // Fetches playback to check if the current song has ended in the playlist
  useEffect(() => {
    const playbackInterval = setInterval(() => fetchCurrentPlayback(), 5000);
    return () => clearInterval(playbackInterval);
  }, [currentTrack]);

  return (
    <CurrentPlaylistContext.Provider
      value={{
        currentPlaylist,
        setCurrentPlaylist,
        matchesCurrentPlaylist,
        playPlaylist,
        playlistUris,
        playlistTrackIds,
        playlistIndex,
      }}
    >
      {children}
    </CurrentPlaylistContext.Provider>
  );
}

export function useCurrentPlaylist() {
  const currentPlaylistContext = useContext(CurrentPlaylistContext);
  if (!currentPlaylistContext) {
    throw new Error(
      "useCurrentPlaylist must be used in CurrentPlaylistProvider"
    );
  }
  return currentPlaylistContext;
}

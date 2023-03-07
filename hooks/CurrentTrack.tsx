import spotifyApi from "@/lib/spotify";
import { Track } from "@/types/spotify";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSpotify from "./Spotify";

type CurrentTrackContextType = {
  currentTrackId: string;
  currentTrack: Track | null;
  setCurrentTrackId: (trackId: string) => void;
  setCurrentTrack: (track: Track) => void;
} | null;

const CurrentTrackContext = createContext<CurrentTrackContextType>(null);

export default function CurrentTrackProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  // other hooks
  const spotifyWebApi = useSpotify();

  // current track state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState("");

  const fetchCurrentTrack = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token && currentTrackId) {
      await axios
        .get(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const response = res.data as Track;
          setCurrentTrack(response);
        });
    }
  };

  // const getCurrentPlayingTrack = async () => {
  //   const token = spotifyWebApi.getAccessToken();
  //   if (token) {
  //     spotifyWebApi.getMyCurrentPlayingTrack().then(async (res) => {
  //       const currentlyPlayingTrack =
  //         res.body as unknown as CurrentlyPlayingTrack;
  //       setCurrentTrack(currentlyPlayingTrack.item);
  //     });
  //   }
  // };

  useEffect(() => {
    if (
      !currentTrackId ||
      !currentTrack ||
      currentTrackId !== currentTrack.id
    ) {
      fetchCurrentTrack();
    }
  }, [currentTrackId, currentTrack, spotifyApi]);

  return (
    <CurrentTrackContext.Provider
      value={{
        currentTrackId,
        currentTrack,
        setCurrentTrackId,
        setCurrentTrack,
      }}
    >
      {children}
    </CurrentTrackContext.Provider>
  );
}

export function useCurrentTrack() {
  const currentTrackContext = useContext(CurrentTrackContext);
  if (!currentTrackContext) {
    throw new Error(
      "useCurrentTrack must be used within the CurrentTrackContext.Provider"
    );
  }
  return currentTrackContext;
}

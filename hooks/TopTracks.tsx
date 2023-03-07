import { TopItems, Tracks } from "@/types/spotify";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCurrentTrack } from "./CurrentTrack";
import useSpotify from "./Spotify";
import { useTimePeriod } from "./TimePeriod";

const TRACK_LIMIT = 50; // 50 track limit

type TopTracksContextType = {
  topTrackData: TopItems | null;
  topTracks: Tracks;
  likedArr: boolean[];
  trackUris: string[];
  trackIds: string[];
} | null;

const TopTracksContext = createContext<TopTracksContextType>(null);

export default function TopTracksProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const timePeriodContext = useTimePeriod();
  const spotifyWebApi = useSpotify();
  const [topTrackData, setTopTrackData] = useState<TopItems | null>(null);
  const [topTracks, setTopTracks] = useState<Tracks>([]);
  const [trackUris, setTrackUris] = useState<string[]>([]);
  const [likedArr, setLikedArr] = useState<boolean[]>([]);
  const [trackIds, setTrackIds] = useState<string[]>([]);

  // fetches top 50 songs based on the time period
  const getTopSongs = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      spotifyWebApi
        .getMyTopTracks({
          limit: TRACK_LIMIT,
          time_range: timePeriodContext.timePeriod,
        })
        .then((res) => {
          const topTrackResponse = res.body as unknown as TopItems;
          if (!topTrackResponse) return;
          setTopTrackData(topTrackResponse);
        });
    }
  };

  // fetches top 50 songs on initial mount
  useEffect(() => {
    getTopSongs();
  }, []);

  // updates tracks, the track ids, and track uris whenever data changes
  useEffect(() => {
    if (topTrackData) {
      const tracks = topTrackData.items as unknown as Tracks;
      const allUris: string[] = tracks.map((track) => track.uri);
      const allTrackIds: string[] = tracks.map((track) => track.id);
      setTopTracks(tracks);
      setTrackIds(allTrackIds);
      setTrackUris(allUris);
    }
  }, [topTrackData]);

  // updates the liked arr whenever data changes
  useEffect(() => {
    if (topTrackData) {
      const tracks = topTrackData.items as unknown as Tracks;
      const trackIds = tracks.map(track => track.id);
      spotifyWebApi.containsMySavedTracks(trackIds).then((res) => {
        const result = res.body as unknown as boolean[];
        setLikedArr(result);
      }).catch();
    }
  }, [topTrackData]);

  return (
    <TopTracksContext.Provider
      value={{ topTrackData, topTracks, trackUris, likedArr, trackIds }}
    >
      {children}
    </TopTracksContext.Provider>
  );
}

export function useTopTracks() {
  const topTracksContext = useContext<TopTracksContextType>(TopTracksContext);
  if (!topTracksContext) {
    throw new Error("useTopTracks must be used in TopTracksProvider");
  }
  return topTracksContext;
}

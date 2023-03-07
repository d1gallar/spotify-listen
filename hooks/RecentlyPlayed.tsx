import { RecentlyPlayed, RecentlyPlayedItem, Tracks } from "@/types/spotify";
import { getPastDay } from "@/util/util";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSpotify from "./Spotify";

type RecentlyPlayedContextType = {
  recentlyPlayedData: RecentlyPlayed | null;
  recentTracks: RecentlyPlayedItem[];
  recentTrackUris: string[];
  recentTrackIds: string[];
  likedArr: boolean[];
} | null;

const RecentlyPlayedContext = createContext<RecentlyPlayedContextType>(null);

export function RecentlyPlayedProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const spotifyWebApi = useSpotify();

  const [recentlyPlayedData, setRecentlyPlayedData] = useState<RecentlyPlayed | null>(
    null
  );
  const [recentTracks, setRecentTracks] = useState<RecentlyPlayedItem[]>([]);
  const [likedArr, setLikedArr] = useState<boolean[]>([]);
  const [recentTrackUris, setRecentTrackUris] = useState<string[]>([]);
  const [recentTrackIds, setRecentTrackIds] = useState<string[]>([]);

  // Fetch all tracks on initial mount
  useEffect(() => {
    const token = spotifyWebApi.getAccessToken();
    const pastDay = getPastDay(new Date());
    if (token) {
      spotifyWebApi
        .getMyRecentlyPlayedTracks({
          after: pastDay.getTime(),
          limit: 50,
        })
        .then((data) => {
          const typedData = data.body as unknown as RecentlyPlayed;
          setRecentlyPlayedData(typedData);
          setRecentTracks(typedData.items);
        })
        .catch();
    }
  }, []);

  // Tracks all tracks and whether they have been liked if data is available
  useEffect(() => {
    if(!recentlyPlayedData) return;
    const allTrackIds: string[] = recentTracks.map((item) => item.track.id);
    spotifyWebApi.containsMySavedTracks(allTrackIds).then((res) => {
      const result = res.body as unknown as boolean[];
      setLikedArr(result);
    });
  }, [recentTracks]);

  // Updates recently played track uris and ids if data is availaable
  useEffect(() => {
    if(!recentlyPlayedData) return;
    const allTrackIds: string[] = recentTracks.map((item) => item.track.id);
    const allTrackUris: string[] = recentTracks.map((item) => item.track.uri);
    setRecentTrackUris(allTrackUris);
    setRecentTrackIds(allTrackIds);
  }, [recentTracks]);

  return (
    <RecentlyPlayedContext.Provider
      value={{
        recentlyPlayedData,
        recentTracks,
        likedArr,
        recentTrackUris,
        recentTrackIds,
      }}
    >
      {children}
    </RecentlyPlayedContext.Provider>
  );
}

export default function useRecentlyPlayed() {
  const recentlyPlayedContext = useContext(RecentlyPlayedContext);
  if (!recentlyPlayedContext)
    throw new Error(
      "useRecentlyPlayed must be used inside RecentlyPlayedProvider."
    );
  return recentlyPlayedContext;
}

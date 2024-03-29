import { RecentlyPlayed, RecentlyPlayedItem, Tracks } from "@/types/spotify";
import { getPastDay } from "@/util/util";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSpotify from "./Spotify";

const TRACK_LIMIT = 50; // limits api to request 50 tracks

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
  const {data: session} = useSession();

  const [recentlyPlayedData, setRecentlyPlayedData] =
    useState<RecentlyPlayed | null>(null);
  const [recentTracks, setRecentTracks] = useState<RecentlyPlayedItem[]>([]);
  const [likedArr, setLikedArr] = useState<boolean[]>([]);
  const [recentTrackUris, setRecentTrackUris] = useState<string[]>([]);
  const [recentTrackIds, setRecentTrackIds] = useState<string[]>([]);

  // Fetches 50 recently played songs from Spotify Api
  const fetchRecentlyPlayed = () => {
    const token = spotifyWebApi.getAccessToken();
    const pastDay = getPastDay(new Date());
    if (token) {
      spotifyWebApi
        .getMyRecentlyPlayedTracks({
          after: pastDay.getTime(),
          limit: TRACK_LIMIT,
        })
        .then((data) => {
          const typedData = data.body as unknown as RecentlyPlayed;
          setRecentlyPlayedData(typedData);
          setRecentTracks(typedData.items);
        })
        .catch((e) => console.error(e));
    }
  };

  // Fetch recently played tracks on initial mount
  useEffect(() => {
    fetchRecentlyPlayed();
  }, [session, spotifyWebApi]);

  // Tracks all tracks and whether they have been liked if data is available
  useEffect(() => {
    if (!recentlyPlayedData) return;
    const allTrackIds: string[] = recentTracks.map((item) => item.track.id);
    spotifyWebApi.containsMySavedTracks(allTrackIds).then((res) => {
      const result = res.body as unknown as boolean[];
      setLikedArr(result);
    });
  }, [recentTracks]);

  // Updates recently played track uris and ids if data is available
  useEffect(() => {
    if (!recentlyPlayedData) return;
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

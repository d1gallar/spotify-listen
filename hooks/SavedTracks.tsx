import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSpotify from "@/hooks/Spotify";
import { useDebounce } from "./Debounce";
import { SavedTrackItems, SavedTracks } from "@/types/spotify";
import { useSession } from "next-auth/react";

const TRACK_LIMIT = 20; // amount of tracks received per api call

type SavedTracksContextType = {
  savedTrackData: SavedTracks | null;
  allSavedTracks: SavedTrackItems;
  likedArr: boolean[] | null;
  isLoading: boolean;
  savedUris: string[];
  savedTrackIds: string[];
  hasNextPage: boolean;
  getNextPage: () => void;
  getDebouncedNextPage: () => void;
  removeTrack: (index: number) => void;
} | null;

const SavedTracksContext = createContext<SavedTracksContextType>(null);

export default function SavedTracksProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const spotifyWebApi = useSpotify();
  const {data: session} = useSession();

  const [savedTrackData, setSavedTrackData] = useState<SavedTracks | null>(
    null
  ); // current api call: includes next,prev,items & others
  const [allSavedTracks, setAllSavedTracks] = useState<SavedTrackItems>([]); // just the saved tracks
  const [likedArr, setLikedArr] = useState<boolean[] | null>(null); // an array of booleans to track if track is saved
  const [currentPage, setCurrentPage] = useState(1); // the current page of api request
  const [hasNextPage, setHasNextPage] = useState(false); // whether the api has a next page
  const [savedUris, setSavedUris] = useState<string[]>([]);
  const [savedTrackIds, setSavedTrackIds] = useState<string[]>([]);

  const [removeTrackIndex, setRemoveTrackIndex] = useState(-1);

  const [isLoading, setLoading] = useState(false);

  const getNextPage = async () => {
    setLoading(true);
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      const offset = (currentPage - 1) * TRACK_LIMIT;
      await spotifyWebApi
        .getMySavedTracks({ limit: TRACK_LIMIT, offset })
        .then((res) => {
          const data = res.body as unknown as SavedTracks;
          setSavedTrackData(data);
          setCurrentPage(currentPage + 1);

          const maxTracks = data.total;
          const maxPages = Math.floor(maxTracks / TRACK_LIMIT);
          setHasNextPage(currentPage <= maxPages);

          if (!savedTrackData) {
            setAllSavedTracks(data.items);
          } else {
            const addedTracks = allSavedTracks.concat(data.items);
            setAllSavedTracks(addedTracks);
          }

          const allTrackIds: string[] = data.items.map((item) => item.track.id);
          setSavedTrackIds(allTrackIds);
          spotifyWebApi.containsMySavedTracks(allTrackIds).then((res) => {
            const result = res.body as unknown as boolean[];
            if (!likedArr) setLikedArr(result);
            else {
              const addedLikedArr = likedArr.concat(result);
              setLikedArr(addedLikedArr);
            }
          });
        });
    }
    setLoading(false);
  };

  const removeTrack = (index: number) => {
    setRemoveTrackIndex(index);
  };

  const getDebouncedNextPage = useDebounce(getNextPage, 1500);

  // Fetches the first 20 saved tracks on initial render
  useEffect(() => {
    if (!savedTrackData || !allSavedTracks || !likedArr) {
      getNextPage();
    }
  }, [spotifyWebApi, session]);

  // checks if a song is going to be removed / unliked
  useEffect(() => {
    if (
      removeTrackIndex === -1 ||
      !likedArr ||
      likedArr.length === 0 ||
      removeTrackIndex < 0 ||
      removeTrackIndex > likedArr.length - 1 ||
      !allSavedTracks ||
      likedArr.length === 0 ||
      !savedTrackData ||
      !savedTrackData.items
    )
      return;

    let likedArrCopy = [...likedArr];
    likedArrCopy.splice(removeTrackIndex, 1);
    setLikedArr(likedArrCopy);

    let savedTracksCopy = [...allSavedTracks];
    let removed = savedTracksCopy.splice(removeTrackIndex, 1);
    setAllSavedTracks(savedTracksCopy);

    let savedTrackDataCopy = { ...savedTrackData };
    savedTrackDataCopy.items = savedTrackDataCopy.items.filter(
      (item) => item.track.id !== removed[0].track.id
    );
    savedTrackDataCopy.total = savedTrackDataCopy.total - 1;
    setSavedTrackData(savedTrackDataCopy);
    setRemoveTrackIndex(-1);
  }, [removeTrack, removeTrackIndex]);

  useEffect(() => {
    const allUris = allSavedTracks.map((item) => item.track.uri);
    const allTrackIds = allSavedTracks.map((item) => item.track.uri);
    setSavedTrackIds(allTrackIds);
    setSavedUris(allUris);
  }, [allSavedTracks]);

  return (
    <SavedTracksContext.Provider
      value={{
        savedTrackData,
        allSavedTracks,
        likedArr,
        isLoading,
        hasNextPage,
        getNextPage,
        getDebouncedNextPage,
        removeTrack,
        savedUris,
        savedTrackIds
      }}
    >
      {children}
    </SavedTracksContext.Provider>
  );
}

export function useSavedTracks() {
  const savedTracksContext = useContext(SavedTracksContext);
  if (!savedTracksContext) {
    throw new Error("useSavedTracks must be used in SavedTracksProvider");
  }
  return savedTracksContext;
}

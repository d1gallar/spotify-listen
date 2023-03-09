import {
  CurrentlyPlayingTrack,
  Device,
  Playback,
  Queue,
  Repeat,
  Track,
} from "@/types/spotify";
import axios, { all } from "axios";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCurrentTrack } from "./CurrentTrack";
import { useDebounce } from "./Debounce";
import { usePopUpToggle } from "./PopUpToggle";
import useSpotify from "./Spotify";

type PlaybackContextType = {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  currentProgress: number;
  queue: Queue | undefined;
  repeatIndex: number;
  device: Device | null;
  playTrack: (trackId: string, trackUri: string) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  fetchCurrentPlayingTrack: () => void;
  handlePlayPause: () => void;
  handleMute: () => void;
  setIsMuted: (isMuted: boolean) => void;
  handleShuffle: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleCurrentProgress: (e: ChangeEvent<HTMLInputElement>) => void;
  fetchQueue: () => void;
  handleRepeat: () => void;
  handleAddToQueue: (uri: string) => void;
  setDevice: (device: Device) => void;
} | null;

export const PlaybackContext = createContext<PlaybackContextType>(null);

export default function PlaybackProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  // Other Hook calls..
  const currentTrackContext = useCurrentTrack();
  if (!currentTrackContext)
    throw new Error("Use CurrentTrackContext in CurrentTrackContextProvider.");
  const { setCurrentTrackId, currentTrackId, currentTrack} = currentTrackContext;
  const { setShowPopUp } = usePopUpToggle();
  const { data: session } = useSession();
  const spotifyWebApi = useSpotify();

  // playback states
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(-1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(-1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [queue, setQueue] = useState<Queue>();
  const [queueCount, setQueueCount] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [device, setDevice] = useState<Device | null>(null);

  const fetchCurrentPlayingTrack = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token && !currentTrackId) {
      spotifyWebApi.getMyCurrentPlayingTrack().then((res) => {
        const currentlyPlayingTrack =
          res.body as unknown as CurrentlyPlayingTrack;
        // console.log(currentlyPlayingTrack);
        if (currentlyPlayingTrack)
          setCurrentTrackId(currentlyPlayingTrack.item.id);

        spotifyWebApi.getMyCurrentPlaybackState().then((res) => {
          const playbackResponse = res.body as unknown as Playback;
          if (!playbackResponse) return;
          setIsPlaying(playbackResponse.is_playing);
          if (playbackResponse.device) {
            setVolume(playbackResponse.device.volume_percent);
            setDevice(playbackResponse.device);
          } else {
            setShowPopUp({
              addLiked: false,
              removeLiked: false,
              createdPlaylist: false,
              copySongLink: false,
              copySongUri: false,
              noDevice: true,
            });
          }
        }).catch();
      });
    }
  };

  // NOTE: uncomment only if using playback bar
  // useEffect(() => {
  //   const token = spotifyWebApi.getAccessToken();
  //   if (token && !currentTrackId) {
  //     fetchCurrentPlayingTrack();
  //     setVolume(50);
  //   }
  // }, [spotifyWebApi, session, currentTrackId]);

  // useEffect(() => {
  //   const token = spotifyWebApi.getAccessToken();
  //   if (
  //     token &&
  //     currentTrackId &&
  //     queue &&
  //     currentTrackId !== queue.currently_playing.id
  //   ) {
  //     fetchCurrentPlayingTrack();
  //   }
  // }, [spotifyWebApi, queue, currentTrackId]);

  const playTrack = (trackId: string, trackUri: string) => {
    if (!trackId || trackId === "" || !trackUri || trackUri === "") return;
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
      setDevice(playbackResponse.device);
      setIsPlaying(playbackResponse.is_playing);
      setCurrentTrackId(trackId);

      spotifyWebApi
        .play({
          uris: [trackUri],
        })
        .then((res) => {
          const playTrack = res.body as unknown as Track;
          setIsPlaying(true);
          if (playTrack) {
            setCurrentTrackId(playTrack.id);
          }
        })
        .catch();
    });
  };

  const handlePlayPause = () => {
    spotifyWebApi
      .getMyCurrentPlaybackState()
      .then((res) => {
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
          return;
        }
        setDevice(playbackResponse.device);
        setIsPlaying(playbackResponse.is_playing);

        if (playbackResponse.is_playing) {
          spotifyWebApi.pause();
          setIsPlaying(false);
        } else {
          spotifyWebApi.play();
          setIsPlaying(true);
        }
      })
      .catch();
  };

  const handleRepeat = () => {
    if (repeatIndex >= 2) setRepeatIndex(0);
    else setRepeatIndex(repeatIndex + 1);
    const repeatArr: Repeat[] = ["track", "context", "off"];
    // console.log(repeatArr[repeatIndex]);
    spotifyWebApi.setRepeat(repeatArr[repeatIndex]);
  };

  const handleMute = () => {
    if (!isMuted && previousVolume === -1) {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
      spotifyWebApi.setVolume(0);
    } else if (isMuted && previousVolume !== -1) {
      setVolume(previousVolume);
      setPreviousVolume(-1);
      setIsMuted(false);
      spotifyWebApi.setVolume(previousVolume);
    }
  };

  const handlePrevious = () => {
    if (!isPlaying) return;
    spotifyWebApi.skipToPrevious().catch((e) => e);
  };

  const handleNext = () => {
    if (!isPlaying) return;
    spotifyWebApi.skipToNext().catch((e) => e);
  };

  const handleShuffle = () => {
    if (!isShuffle) {
      spotifyWebApi.setShuffle(true);
      setIsShuffle(true);
    } else {
      spotifyWebApi.setShuffle(false);
      setIsShuffle(false);
    }
  };

  // checks progress
  const handleCurrentProgress = (e: ChangeEvent<HTMLInputElement>) => {
    const progressVal = Number.parseInt(e.target.value);
    // console.log("listening", currentProgress, progressVal);
    setCurrentProgress(progressVal);
    spotifyWebApi.seek(progressVal);
  };

  // const debounceProgress = useCallback(
  //   useDebounce(() => {
  //     const token = spotifyWebApi.getAccessToken();
  //     if (token) {
  //       spotifyWebApi.getMyCurrentPlaybackState().then((res) => {
  //         const playbackRes = res.body as unknown as Playback;
  //         setCurrentProgress(playbackRes.progress_ms);
  //       });
  //     }
  //   }, 600),
  //   [currentProgress]
  // );

  // useEffect(() => {
  //   debounceProgress();
  // }, [currentProgress, currentTrackId]);

  const debounceVolume = useCallback(
    useDebounce((volume) => {
      const token = spotifyWebApi.getAccessToken();
      
      // Mobile devices do not have in app mobile volume control
      if(token && device && device.type !== "Smartphone"){
        spotifyWebApi.setVolume(volume);
      }
    }, 600),
    [volume]
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceVolume(volume);
    }
  }, [volume, isMuted]);

  const fetchQueue = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      await axios
        .get("https://api.spotify.com/v1/me/player/queue", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const queue = res.data as Queue;
          setQueue(queue);
          // console.log(queue);
        });
    }
  };

  const handleAddToQueue = (uri: string) => {
    spotifyWebApi.addToQueue(uri);
    setQueueCount(queueCount + 1);
  };

  useEffect(() => {
    fetchQueue();
  }, [spotifyWebApi, session]);


  return (
    <PlaybackContext.Provider
      value={{
        isPlaying,
        playTrack,
        volume,
        currentProgress,
        queue,
        repeatIndex,
        setVolume,
        setIsPlaying,
        fetchCurrentPlayingTrack,
        handlePlayPause,
        isMuted,
        handleMute,
        setIsMuted,
        isShuffle,
        handleShuffle,
        handlePrevious,
        handleNext,
        handleCurrentProgress,
        fetchQueue,
        handleRepeat,
        handleAddToQueue,
        device,
        setDevice,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const playbackContext = useContext(PlaybackContext);
  if (!playbackContext) {
    throw new Error(
      "usePlayback must be used within the PlaybackContext.Provider"
    );
  }
  return playbackContext;
}

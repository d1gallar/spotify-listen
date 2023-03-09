import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useTimePeriod } from "@/hooks/TimePeriod";
import useSpotify from "@/hooks/Spotify";
import { TopItems } from "@/types/spotify";

export const useTopItems = ({
  type,
  limit,
}: {
  type: string;
  limit: number;
}) => {
  const { data: session } = useSession();
  const { timePeriod } = useTimePeriod();
  const spotifyWebApi = useSpotify();

  const [topItems, setTopItems] = useState<TopItems | null>(null);
  const [isLoading, setLoading] = useState(false);

  // Fetches the Spotify top items based on the type: tracks or artists
  const getTopItems = async (type: string, limit: number) => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      await axios
        .get(
          `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${timePeriod}&offset=0`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTopItems(res.data);
        });
    }
  };

  // Fetches top items on initial mount/render
  useEffect(()=>{
    setLoading(true);
    getTopItems(type, limit);
    setLoading(false);
  },[spotifyWebApi, session])

  // Renders after the time period changes
  useMemo(() => {
    setLoading(true);
    getTopItems(type, limit);
    setLoading(false);
  }, [timePeriod]);

  return { topItems, isLoading };
};

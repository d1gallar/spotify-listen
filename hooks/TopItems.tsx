import { TimeRange, TopItems } from "@/types/spotify";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "./Spotify";
import axios from "axios";
import { useTimePeriod } from "./TimePeriod";

export const useTopItems = ({
  type,
  limit,
}: {
  type: string;
  limit: number;
}) => {
  const { timePeriod } = useTimePeriod();
  const [topItems, setTopItems] = useState<TopItems | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const spotifyWebApi = useSpotify();

  const getTopItems = async (type: string, limit: number, token: string) => {
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
  };

  useMemo(() => {
    setLoading(true);
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      getTopItems(type, limit, token);
    }
    setLoading(false);
  }, [session, spotifyWebApi, timePeriod]);

  return { topItems, isLoading };
};

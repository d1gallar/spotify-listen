import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTimePeriod } from "@/hooks/TimePeriod";
import { useTopTracks } from "@/hooks/TopTracks";
import PlaylistContainer from "../PlaylistContainer";
import PlaylistControls from "../PlaylistControls";
import PlaylistTop from "../PlaylistTop";
import TopTracks from "../TopTracks";

export default function TopTracksInner() {
  const { topTrackData, topTracks, trackUris, likedArr, trackIds } =
    useTopTracks();
  const { timePeriod } = useTimePeriod();
  const [playlistDuration, setPlaylistDuration] = useState(0);

  useEffect(() => {
    if (topTracks) {
      let newDuration = 0;
      topTracks.map((item) => (newDuration += item.duration_ms));
      setPlaylistDuration(newDuration);
    }
  }, [topTracks]);

  if (
    !topTrackData ||
    !topTracks ||
    !likedArr ||
    !trackIds ||
    !trackUris ||
    topTracks.length === 0 ||
    likedArr.length === 0 ||
    trackIds.length === 0 ||
    trackUris.length === 0
  )
    return null;

  const getDescription = () => {
    let description = "";
    switch (timePeriod) {
      case "short_term":
        description = "Here are your top songs from the past month.";
        break;
      case "medium_term":
        description = "Here are your top songs from the past 6 months.";
        break;
      case "long_term":
        description = "Here are your top songs of all time!";
        break;
    }
    return description;
  };

  const playlistName = "Top Songs:" + timePeriod.toString();

  return (
    <InfiniteScroll
      className="w-full h-full px-8 py-8 overflow-y-scroll overflow-x-none"
      next={() => {}}
      hasMore={false}
      loader={undefined}
      dataLength={0}
      height={"100vh"}
    >
      <div className="w-full h-full min-w-[720px]">
        <PlaylistTop
          collaborative={false}
          followerTotal={0}
          image={"images/top-songs-cover.svg"}
          name={"My Top Songs"}
          public={false}
          playlistLength={50}
          description={getDescription()}
          gradient={"from-light-pink to-[#121212]"}
          totalDuration={playlistDuration}
        />
        <PlaylistContainer>
          <PlaylistControls
            createPlaylistEnabled={true}
            trackUris={trackUris}
            playlistName={playlistName}
            tracks={topTracks}
          />
          <TopTracks
            tracks={topTracks}
            likedArr={likedArr}
            playlistName={playlistName}
          />
        </PlaylistContainer>
      </div>
    </InfiniteScroll>
  );
}

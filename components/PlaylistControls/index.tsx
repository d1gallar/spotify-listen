import { Tracks } from "@/types/spotify";
import CreatePlaylistBtn from "../CreatePlaylistBtn";
import LargePlaySongBtn from "../LargePlayBtn";

type PlaylistControlsProps = {
  trackUris: string[];
  tracks: Tracks;
  playlistName: string;
  createPlaylistEnabled?: boolean;
};

export default function PlaylistControls(props: PlaylistControlsProps) {
  return (
    <div className="w-full h-fit flex flex-row justify-between pt-4 pb-8">
      <LargePlaySongBtn
        playlistName={props.playlistName}
        tracks={props.tracks}
        trackUris={props.trackUris}
      />
      {props.createPlaylistEnabled && props.trackUris && (
        <CreatePlaylistBtn trackUris={props.trackUris} />
      )}
    </div>
  );
}

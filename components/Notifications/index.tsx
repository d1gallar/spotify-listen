import { usePopUpToggle } from "@/hooks/PopUpToggle";
import PopUpBanner from "../PopUpBanner";

export default function Notifications() {
  const { showPopUp } = usePopUpToggle();
  const {
    removeLiked,
    createdPlaylist,
    addLiked,
    copySongLink,
    copySongUri,
    noDevice,
  } = showPopUp;
  return (
    <div className="w-full h-fit flex flex-row justify-center absolute z-50 bottom-[100px]">
      {createdPlaylist && (
        <PopUpBanner>
          <p className="font-circular text-white text-sm font-base text-center">
            Created Playlist
          </p>
        </PopUpBanner>
      )}
      {removeLiked && (
        <PopUpBanner>
          <p className="font-circular text-white text-sm font-base text-center">
            Removed from <b>Liked Songs</b>
          </p>
        </PopUpBanner>
      )}
      {addLiked && (
        <PopUpBanner>
          <p className="font-circular text-white text-sm font-base text-center">
            Added to <b>Liked Songs</b>
          </p>
        </PopUpBanner>
      )}
      {copySongLink && (
        <PopUpBanner>
          <p className="font-circular text-white text-sm font-base text-center">
            Link copied to clipboard
          </p>
        </PopUpBanner>
      )}
      {copySongUri && (
        <PopUpBanner>
          <p className="font-circular text-white text-sm font-base text-center">
            Spotify Uri copied to clipboard
          </p>
        </PopUpBanner>
      )}
      {noDevice && (
        <PopUpBanner>
          <p className="font-circular text-white text-sm font-base text-center">
            Start playing from an existing device.
          </p>
        </PopUpBanner>
      )}
    </div>
  );
}

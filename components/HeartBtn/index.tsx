import Image from "next/image";
import { usePopUpToggle } from "@/hooks/PopUpToggle";
import useSpotify from "@/hooks/Spotify";
import useSavedTracks from "@/hooks/SavedTracks";

type HeartBtnProps = {
  isLiked: boolean;
  trackId: string;
  isHover?: boolean;
  setTrackLiked: (trackLiked: boolean) => void;
};

export default function HeartBtn(props: HeartBtnProps) {
  const { setShowPopUp } = usePopUpToggle();
  const spotifyWebApi = useSpotify();

  const likeTrack = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      spotifyWebApi.addToMySavedTracks([props.trackId]);
      props.setTrackLiked(true);
      setShowPopUp({
        addLiked: true,
        removeLiked: false,
        createdPlaylist: false,
        copySongLink: false,
        copySongUri: false,
        noDevice: false
      });
    }
  };

  const removeLikedTrack = async () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      spotifyWebApi.removeFromMySavedTracks([props.trackId]);
      props.setTrackLiked(false);
      setShowPopUp({
        removeLiked: true,
        addLiked: false,
        createdPlaylist: false,
        copySongLink: false,
        copySongUri: false,
        noDevice: false
      });
    }
  };

  const toggleLike = () => {
    if (props.isLiked) {
      removeLikedTrack();
    } else {
      likeTrack();
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`min-w-[16px] max-w[16px] w-[16px] flex justify-center items-center ${
        props.isLiked ? "animate-expandHeart" : "animate-shakeHeart"
      }`}
    >
      {props.isLiked ? (
        <Image
          src="/images/green-heart-icon.svg"
          width={16}
          height={16}
          alt="Green Filled Heart Icon"
          draggable={false}
        />
      ) : (
        props.isHover && (
          <Image
            src="/images/white-heart-icon.svg"
            width={16}
            height={16}
            alt="White Empty Heart Icon"
            draggable={false}
          />
        )
      )}
    </button>
  );
}

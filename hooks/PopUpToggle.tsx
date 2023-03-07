import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type PopUpType = {
  addLiked: boolean;
  removeLiked: boolean;
  createdPlaylist: boolean;
  copySongLink: boolean;
  copySongUri: boolean;
  noDevice: boolean;
};

type PopUpToggleContexType = {
  showPopUp: PopUpType;
  setShowPopUp: (showPopUp: PopUpType) => void;
};

const PopUpToggleContext = createContext<PopUpToggleContexType | null>(null);

export default function PopUpToggleProvider(props: {
  children: ReactNode | ReactNode[];
}) {
  const [showPopUp, setShowPopUp] = useState({
    addLiked: false,
    removeLiked: false,
    createdPlaylist: false,
    copySongLink: false,
    copySongUri: false,
    noDevice: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp({
        addLiked: false,
        removeLiked: false,
        createdPlaylist: false,
        copySongLink: false,
        copySongUri: false,
        noDevice: false,
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [showPopUp]);

  return (
    <PopUpToggleContext.Provider value={{ showPopUp, setShowPopUp }}>
      {props.children}
    </PopUpToggleContext.Provider>
  );
}

export function usePopUpToggle() {
  const popUpToggleContext = useContext(PopUpToggleContext);
  if (!popUpToggleContext) {
    throw new Error("usePopUpToggle must be used inside PopUpToggleProvider.");
  }
  return popUpToggleContext;
}

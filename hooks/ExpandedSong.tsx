"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ExpandedSongContextType =
  | {
      isSongExpanded: boolean;
      expandSong: () => void;
      hideSong: () => void;
    }
  | undefined;

const ExpandedSongContext = createContext<ExpandedSongContextType>(undefined);

export default function ExpandedSongProvider(props: {
  children: ReactNode | ReactNode[];
}) {
  const [isSongExpanded, setIsSongExpanded] = useState(true);

  const expandSong = () => {
    setIsSongExpanded(true);
  };

  const hideSong = () => {
    setIsSongExpanded(false);
  };

  return (
    <ExpandedSongContext.Provider
      value={{ isSongExpanded, expandSong, hideSong }}
    >
      {props.children}
    </ExpandedSongContext.Provider>
  );
}

export function useExpandedSong() {
  const expandedSongContext = useContext(ExpandedSongContext);
  if (expandedSongContext === undefined) {
    throw new Error(
      "SongExpandedContext must be used in SongExpandedProvider."
    );
  }
  return expandedSongContext;
}

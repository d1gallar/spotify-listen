import { createContext, ReactNode, useContext, useState } from "react";

type ProfileToggleContext = {
  isOpen: boolean;
  toggleOpen: () => void;
  setProfileOpen: (isOpen: boolean) => void;
};

const ProfileToggleContext = createContext<ProfileToggleContext | null>(null);

export default function ProfileToggleProvider(props: {
  children: ReactNode | ReactNode[];
}) {
  const [isOpen, setProfileOpen] = useState(false);

  const toggleOpen = () => {
    setProfileOpen(!isOpen);
  };

  return (
    <ProfileToggleContext.Provider
      value={{ isOpen, toggleOpen, setProfileOpen }}
    >
      {props.children}
    </ProfileToggleContext.Provider>
  );
}

export function useProfileToggle() {
  const profileToggleContext = useContext(ProfileToggleContext);
  if (!profileToggleContext) {
    throw new Error(
      "useProfileToggle must be used inside ProfileToggleProvider."
    );
  }
  return profileToggleContext;
}

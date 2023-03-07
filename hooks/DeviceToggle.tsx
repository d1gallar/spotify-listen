import { createContext, ReactNode, useContext, useState } from "react";

type DeviceToggleContext = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const DeviceToggleContext = createContext<DeviceToggleContext | null>(null);

export default function DeviceToggleProvider(props: {
  children: ReactNode | ReactNode[];
}) {
  const [isOpen, setDeviceOpen] = useState(false);

  const toggleOpen = () => {
    setDeviceOpen(!isOpen);
  };

  return (
    <DeviceToggleContext.Provider value={{ isOpen, toggleOpen }}>
      {props.children}
    </DeviceToggleContext.Provider>
  );
}

export function useDeviceToggle() {
  const deviceToggleContext = useContext(DeviceToggleContext);
  if (!deviceToggleContext) {
    throw new Error(
      "useDeviceToggleOpen must be used in DeviceToggleProvider."
    );
  }
  return deviceToggleContext;
}

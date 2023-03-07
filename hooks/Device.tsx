import { Device, Devices } from "@/types/spotify";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useSpotify from "./Spotify";

type DeviceContextType = {
  devices: Devices | null;
  deviceId: string | null;
  currentDevice: Device | null;
  setDeviceId: (deviceId: string) => void;
  setDevices: (devices: Devices) => void;
  setCurrentDevice: (device: Device) => void;
  fetchDevices: () => void;
} | null;

const DeviceContext = createContext<DeviceContextType>(null);

export default function DeviceProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const spotifyWebApi = useSpotify();
  const [devices, setDevices] = useState<Devices | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);

  const fetchDevices = () => {
    const token = spotifyWebApi.getAccessToken();
    if (token) {
      spotifyWebApi.getMyDevices().then((res) => {
        const devices = res.body.devices as unknown as Devices;
        if (devices) {
          setDevices(devices);
          setDeviceId(devices[0].id);
        }
      }).catch(e =>{
        console.log("device error",e)
      });
    }
  };

  useEffect(()=>{
    if(!deviceId || !devices){
      fetchDevices();
    }
  },[])

  // changes current device info when id is changed
  useEffect(() => {
    if (!devices) return;
    devices.map((device) => {
      if (device.id === deviceId) {
        setCurrentDevice(device);
      }
    });
  }, [deviceId]);

  return (
    <DeviceContext.Provider
      value={{ devices, fetchDevices, currentDevice, deviceId, setDeviceId, setCurrentDevice, setDevices }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const deviceContext = useContext(DeviceContext);
  if (!deviceContext) {
    throw new Error("useDevice must be used inside of DeviceContextProvider.");
  }
  return deviceContext;
}

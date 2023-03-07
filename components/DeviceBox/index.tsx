import { useEffect } from "react";
import { useDeviceToggle } from "@/hooks/DeviceToggle";
import { useDevice } from "@/hooks/Device";
import { DeviceType } from "../DeviceType";
import { Devices } from "@/types/spotify";

export default function DeviceBox() {
  const { isOpen } = useDeviceToggle();
  const {
    devices,
    fetchDevices,
    currentDevice,
  } = useDevice();

  useEffect(() => {
    fetchDevices();
  }, []);
  
  let inactiveDevices: Devices | null = null;
  if(devices !== null){
    inactiveDevices = (devices as Devices).filter(device => !device.is_active);
  }
  return isOpen ? (
      <div className="absolute bottom-0 right-0 shadow-md rounded-md translate-x-[-24px] overflow-y-auto translate-y-[-70px] w-[14vw] min-w-[250px] max-w-[350px] h-fit max-h-[calc(100vh-24px)] bg-[#282828] p-5 z-10">
        <div className="w-full h-fit pl-3 pr-2">
          <div className="w-full h-fit flex flex-row gap-4 justify-start items-center">
            <DeviceType type={currentDevice?.type || ""} isActive={true} />
            <div className="flex flex-col justify-start gap-1">
              <h6 className="text-white font-bold ">Current Device</h6>
              {currentDevice === null ? (
                <p className="text-spotify-green font-medium tracking-tight text-sm">
                  This Web Browser
                </p>
              ) : (
                <h6 className="text-spotify-green font-medium tracking-tight text-xs">{currentDevice.name}</h6>
              )}
            </div>
          </div>
        </div>
        {inactiveDevices === null || inactiveDevices.length === 0 ? null : (
          <>
            <p className="font-circular text-white font-semibold text-sm mt-6 mb-2 hover:text-white">
              Select another device
            </p>
            <div className="w-full h-fit flex flex-col">
              {inactiveDevices.map((device) => {
                return (
                  <button className="w-full h-fit pl-3 pt-3 pb-3 pr-2 rounded-sm gap-3 items-center flex flex-row justify-start hover:cursor-pointer hover:backdrop-filter hover:backdrop-brightness-125" key={device.id}>
                    <DeviceType type={device.type} isActive={false} />
                    <span className="font-circular text-[#FFFFFFE6] font-base text-sm hover:text-white">
                      {device.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
  ) : null;
}

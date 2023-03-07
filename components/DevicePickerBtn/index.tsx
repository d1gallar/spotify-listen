import Image from "next/image";
import { useDeviceToggle } from "@/hooks/DeviceToggle";

export default function DevicePickerBtn() {
  const { isOpen, toggleOpen } = useDeviceToggle();
  return (
    <button
      className="flex flex-row justify-center items-center w-8 h-8 opacity-80 hover:opacity-100 active:opacity-80"
      onClick={toggleOpen}
    >
      {isOpen ? (
        <Image
          src="/images/green-device-picker-icon.svg"
          width={16}
          height={16}
          alt="Device Icon"
          draggable={false}
        />
      ) : (
        <Image
          src="/images/white-device-picker-icon.svg"
          width={16}
          height={16}
          alt="Device Icon"
          draggable={false}
        />
      )}
    </button>
  );
}

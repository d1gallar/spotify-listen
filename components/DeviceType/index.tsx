import Image from "next/image";

type DeviceTypeProps = {
  type: string;
  isActive: boolean;
};

type DeviceInfo = {
  type: string;
  active: string;
  inactive: string;
};

const deviceTypesArr = [
  {
    type: "Computer",
    active: "/images/green-computer-icon.svg",
    inactive: "/images/white-computer-icon.svg",
  },
  {
    type: "smartphone",
    active: "/images/green-computer-icon.svg",
    inactive: "/images/white-computer-icon.svg",
  },
  {
    type: "TV",
    active: "/images/green-tv-icon.svg",
    inactive: "/images/white-tv-icon.svg",
  },
  {
    type: "game_console",
    active: "/images/green-gameconsole-icon.svg",
    inactive: "/images/white-gameconsole-icon.svg",
  },
  {
    type: "cast_video",
    active: "/images/green-cast-icon.svg",
    inactive: "/images/white-cast-icon.svg",
  },
  {
    type: "cast_audio",
    active: "/images/green-cast-icon.svg",
    inactive: "/images/white-cast-icon.svg",
  },
  {
    type: "tablet",
    active: "/images/green-tablet-icon.svg",
    inactive: "/images/white-tablet-icon.svg",
  },
  {
    type: "speaker",
    active: "/images/green-speaker-icon.svg",
    inactive: "/images/white-speaker-icon.svg",
  },
  {
    type: "avr",
    active: "/images/green-audiovideo-icon.svg",
    inactive: "/images/white-audiovideo-icon.svg",
  },
  {
    type: "stb",
    active: "/images/green-audiovideo-icon.svg",
    inactive: "/images/white-audiovideo-icon.svg",
  },
  {
    type: "audio_dongle",
    active: "/images/green-dongle-icon.svg",
    inactive: "/images/white-dongle-icon.svg",
  },
  {
    type: "automobile",
    active: "/images/green-car-icon.svg",
    inactive: "/images/white-car-icon.svg",
  },
];

export function DeviceType(props: DeviceTypeProps) {
  let typeSrc: DeviceInfo | null = null;
  deviceTypesArr.map((item) => {
    if (props.type == item.type) {
      typeSrc = item as DeviceInfo;
      return item;
    }
  });

  if (typeSrc === null || typeSrc === undefined || props.type === "") {
    const iconSrc = props.isActive
      ? deviceTypesArr[0].active
      : deviceTypesArr[0].inactive;
    return (
      <Image
        src={iconSrc}
        width={30}
        height={30}
        alt="computer"
        draggable={false}
      />
    );
  } else {
    const iconSrc = props.isActive
      ? (typeSrc as DeviceInfo).active
      : (typeSrc as DeviceInfo).inactive;
    return (
      <Image
        src={iconSrc}
        width={30}
        height={30}
        alt={props.type + " icon"}
        draggable={false}
      />
    );
  }
}

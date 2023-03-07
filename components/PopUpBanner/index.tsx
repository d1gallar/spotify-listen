import { ReactNode, useEffect, useState } from "react";

type PopUpBannerProps = {
  children: ReactNode | ReactNode[];
}

export default function PopUpBanner(props: PopUpBannerProps){
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, [fade]);

  return (
    <div className={`relative bg-[#287aff] w-fit h-fit rounded-md px-3 py-2 hover:cursor-defaults ${!fade ? "opacity-100":"transition-opacity ease-out duration-800 opacity-0"}`}>
      {props.children}
    </div>
  )
}
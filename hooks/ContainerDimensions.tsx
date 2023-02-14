import { useEffect, useState } from "react";

export const useContainerDimensions = (
  myRef: React.RefObject<HTMLDivElement> | null
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => {
      if (myRef !== null && myRef.current !== null)
        return {
          width: myRef.current.offsetWidth,
          height: myRef.current.offsetHeight,
        };
      return null;
    };

    const handleResize = () => {
      if (getDimensions() === null) {
        setDimensions({ width: 0, height: 0 });
      } else {
        setDimensions(getDimensions() as { width: number; height: number });
      }
    };

    if (myRef && myRef.current) {
      setDimensions(getDimensions() as { width: number; height: number });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return dimensions;
};

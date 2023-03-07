import { useMemo, useState } from "react";

export default function useHover() {
  const [isHover, setIsHover] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setIsHover(true);
      },
      onMouseOut() {
        setIsHover(false);
      },
    }),
    []
  );

  return { isHover, eventHandlers };
}

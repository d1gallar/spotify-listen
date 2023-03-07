"use client";

import { RefObject, useEffect, useState } from "react";

export const useHorizontalOverflow = (
  ref: RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => {}
) => {
  const [isOverflow, setIsOverflow] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (current) {
        const hasOverflow = current.scrollWidth > current.clientWidth;
        setIsOverflow(hasOverflow);
        if (callback) callback(hasOverflow);
      }
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};

"use client";

import { useCallback } from "react";
import { useEffect, useState } from "react";

export default function useOutSideAlert(inside: React.RefObject<HTMLDivElement | null | HTMLSpanElement>, handlerToRun: (inside: boolean) => void) {
  const [isInside, setInside] = useState(false);

  const handler = useCallback(
    (e: MouseEvent) => {
      const itemClicked = e.target as HTMLElement;
      if (inside.current && inside.current.contains(itemClicked)) {
        handlerToRun(true);
        setInside(true);
      } else {
        handlerToRun(false);
        setInside(false);
      }
    },
    [handlerToRun, inside, inside.current]
  );
  useEffect(() => {
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handler, inside.current, inside]);
  return isInside;
}

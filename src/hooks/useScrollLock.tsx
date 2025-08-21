//모바일시트(FilterButtomSheet) 열릴 때
import { useEffect } from "react";
export function useScrollLock(locked) {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    if (locked) root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [locked]);
}

import { useEffect } from "react";
export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (e: Event) => void,
  when = true,
) {
  useEffect(() => {
    if (!when) return;
    function onDown(e: Event) {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handler(e);
    }
    document.addEventListener("mousedown", onDown, true);
    document.addEventListener("touchstart", onDown, true);
    return () => {
      document.removeEventListener("mousedown", onDown, true);
      document.removeEventListener("touchstart", onDown, true);
    };
  }, [ref, handler, when]);
}

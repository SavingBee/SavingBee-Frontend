import { useEffect } from "react";
export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (e: Event) => void,
  when = true,
) {
  useEffect(() => {
    if (!when) return;

    function onPointerDown(e: Event) {
      // ← 전역 게이트: 시트 열려 있으면 바로 무시
      if (document.body.dataset.blockOutside === "1") return;

      const el = ref.current;
      if (!el) return;
      const path = (e as any).composedPath?.() as EventTarget[] | undefined;
      const inside = path ? path.includes(el) : el.contains(e.target as Node);
      if (inside) return;
      handler(e);
    }

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [ref, handler, when]);
}

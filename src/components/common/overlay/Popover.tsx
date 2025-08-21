import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
// import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type Align = "start" | "end";
type Props = {
  open: boolean;
  anchorEl: HTMLElement | null | undefined;
  align?: Align;
  offset?: number;
  onClose: () => void;
  children: React.ReactNode;
  preferredWidth: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(v, max));

export default function Popover({
  open,
  anchorEl,
  align = "start",
  offset = 8,
  onClose,
  preferredWidth = 360,
  children,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  // useOnClickOutside(boxRef, onClose, open);
  const [pos, setPos] = useState({ top: 0, left: 0, width: preferredWidth });

  useEffect(() => {
    if (!open || !anchorEl) return;
    function place() {
      const rect = anchorEl.getBoundingClientRect();
      const vw = window.innerWidth;

      // 고정 폭 기반 배치: 초기 레이아웃 전 34px 이슈 방지
      const pw = Math.min(preferredWidth, vw - 32); // 좌우 16px 여백
      const top = Math.round(rect.bottom + offset);
      const rawLeft =
        align === "end" ? Math.round(rect.right - pw) : Math.round(rect.left);
      const left = clamp(rawLeft, 16, vw - pw - 16);

      setPos({ top, left, width: pw });
    }
    place();
    const ro = new ResizeObserver(place);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, anchorEl, align, offset, preferredWidth]);

  // ************ 바깥 클릭(문서 캡처 단계)에서만 닫기
  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e: Event) => {
      const box = boxRef.current;
      if (!box) return;

      const path = (e as any).composedPath?.() as EventTarget[] | undefined;
      const insideBox = path
        ? path.includes(box)
        : box.contains(e.target as Node);
      const insideAnchor = anchorEl
        ? path
          ? path.includes(anchorEl)
          : anchorEl.contains(e.target as Node)
        : false;

      // dialog/anchor 내부 클릭이면 무시, 그 외(진짜 바깥)만 닫기
      if (insideBox || insideAnchor) return;
      onClose();
    };

    document.addEventListener("pointerdown", onDocPointerDown, true); // 캡처 단계
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown, true);
    };
  }, [open, anchorEl, onClose]);

  if (!open) return null;

  const portalRoot = document.getElementById("ui-portal");
  if (!portalRoot) return null;

  return createPortal(
    <div
      ref={boxRef}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        transition: "opacity 200ms, transform 200ms",
      }}
      className="hidden sm:block rounded-xl bg-white border border-black2/10 p-4 shadow-lg z-50 max-w-[min(360px,calc(100vw-32px))] opacity-100"
    >
      {children}
    </div>,
    portalRoot,
  );
}

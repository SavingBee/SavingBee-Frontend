import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
// import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useScrollLock } from "@/hooks/useScrollLock";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({
  open,
  title,
  onClose,
  onApply,
  onReset,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  // useOnClickOutside(ref, onClose, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // ************ 윈도우 캡처 가드: 시트 내부 발생 이벤트면 전파를 즉시 차단
  useEffect(() => {
    if (!open) return;
    const guard = (e: Event) => {
      const el = ref.current;
      if (!el) return;
      const path = (e as any).composedPath?.() as EventTarget[] | undefined;
      const inside = path ? path.includes(el) : el.contains(e.target as Node);
      if (inside) {
        (e as any).stopImmediatePropagation?.();
        e.stopPropagation();
      }
    };
    window.addEventListener("pointerdown", guard, true);
    // window.addEventListener("click", guard, true);
    window.addEventListener("touchstart", guard, true);
    return () => {
      window.removeEventListener("pointerdown", guard, true);
      // window.removeEventListener("click", guard, true);
      window.removeEventListener("touchstart", guard, true);
    };
  }, [open]);

  // *************** 시트 바깥을 누르면 닫기
  useEffect(() => {
    if (!open) return;
    const closer = (e: Event) => {
      const el = ref.current;
      if (!el) return;
      const path = (e as any).composedPath?.() as EventTarget[] | undefined;
      const inside = path ? path.includes(el) : el.contains(e.target as Node);
      if (!inside) onClose();
    };
    window.addEventListener("pointerdown", closer, true);
    return () => window.removeEventListener("pointerdown", closer, true);
  }, [open, onClose]);

  if (!open) return null;
  const portalRoot = document.getElementById("ui-portal");
  if (!portalRoot) return null;

  // const stopAll = (e: any) => e.stopPropagation();

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* 백드롭 클릭시만 필터팝업 닫기 */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={(e) => {
          console.log(e.target);
          if (e.target === e.currentTarget) onClose();
          // console.log(e, "hello");
        }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      />
      <section
        // onPointerDownCapture={stopAll}
        onPointerDownCapture={(e) => {
          e.stopPropagation();
        }}
        ref={ref}
        role="dialog"
        aria-modal="true"
        className="absolute inset-x-0 bottom-0 max-h-[75vh] rounded-t-2xl bg-white shadow-2xl border-t border-black2/10 overflow-hidden"
        style={{ transform: "translateY(0)", transition: "transform 200ms" }}
      >
        <header className="p-4 pb-2 text-base font-semibold">{title}</header>
        <div className="px-4 pb-20 overflow-auto">{children}</div>
        <footer className="sticky bottom-0 bg-white border-t border-black2/10 p-4 flex gap-2 justify-end">
          <button
            className="px-3 py-2 rounded-lg border border-black3/20"
            onClick={onReset}
          >
            초기화
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-primary text-white"
            onClick={onApply}
          >
            확인
          </button>
        </footer>
      </section>
    </div>,
    portalRoot,
  );
}

function FilterBottomSheet({
  open,
  title,
  children,
  onApply,
  onReset,
  onClose,
}) {
  const ref = useRef(null);
  useScrollLock(open);
  useOnClickOutside(ref, onClose, open); // 바깥 터치 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  useFocusTrap(ref, open);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50">
      {" "}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />{" "}
      <section
        ref={ref}
        role="dialog"
        aria-modal="true"
        className="absolute inset-x-0 bottom-0 max-h-[75vh] rounded-t-2xl bg-white shadow-2xl border-t border-gray-200 translate-y-0 transition-transform"
      >
        {" "}
        <header className="p-4 pb-2 text-base font-semibold">
          {title}
        </header>{" "}
        <div className="px-4 pb-20 overflow-auto">{children}</div>{" "}
        <footer className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-2 justify-end">
          {" "}
          <button className="btn-secondary" onClick={onReset}>
            초기화
          </button>{" "}
          <button className="btn-primary" onClick={onApply}>
            확인
          </button>{" "}
        </footer>{" "}
      </section>{" "}
    </div>,
    document.getElementById("ui-portal"),
  );
}

export default FilterBottomSheet;

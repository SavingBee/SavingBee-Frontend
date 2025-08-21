function Popover({ open, anchorEl, align = "start", children, onClose }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  useOnClickOutside(ref, onClose, open);
  useEffect(() => {
    if (!open || !anchorEl) return;
    function place() {
      if (ref.current) setPos(placePopover(anchorEl, ref.current, align, 8));
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
  }, [open, anchorEl, align]);
  if (!open) return null;
  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
      }}
      className="rounded-xl bg-white border border-gray-200 p-4 shadow-lg z-50 max-w-[min(360px,calc(100vw-32px))] transition duration-200"
    >
      {" "}
      {children}{" "}
    </div>,
    document.getElementById("ui-portal"),
  );
}

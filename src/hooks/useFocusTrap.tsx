//내부 탭 순환
function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;
    const selector =
      'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';
    let nodes = Array.from(el.querySelectorAll(selector)).filter(
      (n) => !n.hasAttribute("disabled"),
    );
    if (!nodes.length) return;
    nodes[0].focus();
    function onKey(e) {
      if (e.key !== "Tab") return;
      nodes = Array.from(el.querySelectorAll(selector)).filter(
        (n) => !n.hasAttribute("disabled"),
      );
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [containerRef, active]);
}

export default useFocusTrap;

import { useEffect, useRef } from "react";

interface FilterDropdownProps {
  children: React.ReactNode;
  onClose?: () => void;
  variant?: "checkbox" | "input";
}

export default function FilterDropdown({
  children,
  onClose,
  variant = "checkbox",
}: FilterDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose?.();
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  const style =
    variant === "input" ? "  border-none shadow z-30" : "p-4 shadow z-30";

  return (
    <div className={`absolute left-0 top-full mt-2  rounded-md ${style}`}>
      {children}
    </div>
  );
}

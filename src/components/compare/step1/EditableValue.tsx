import { useEffect, useRef, useState } from "react";

interface Props {
  value: number | string;
  onChange: (next: number | string) => void;
  placeholder?: string;
  suffix?: string;
  format?: "currency" | "percent";
  className?: string;
  inputClassName?: string;
  inputMode?: "decimal" | "numeric";
  widthCh?: number;
}

function display(v: number | string, fmt?: "currency" | "percent") {
  if (v === "" || v === undefined || v === null) return "";
  const n = Number(v);
  if (!Number.isNaN(n)) {
    if (fmt === "currency") return n.toLocaleString();
    if (fmt === "percent") return String(n);
  }
  return String(v);
}

export default function EditableValue({
  value,
  onChange,
  placeholder,
  suffix,
  format,
  className = "",
  inputClassName = "",
  inputMode = "decimal",
  widthCh = 6,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ""));
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(String(value ?? ""));
      requestAnimationFrame(() => ref.current?.select());
    }
  }, [editing, value]);

  const commit = () => {
    const num = Number(draft);
    onChange(Number.isNaN(num) ? draft : num);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(String(value ?? ""));
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        aria-label="값 편집"
        className={`
          inline-flex items-end gap-1
          border-b-2 border-primary pb-1
          bg-transparent p-0 m-0 rounded-none
          ${className}
        `}
        style={{ minWidth: `${widthCh}ch` }}
      >
        <span>{display(value, format) || placeholder}</span>
        {suffix && <span className="text-base font-semibold">{suffix}</span>}
      </button>
    );
  }

  return (
    <span
      className="inline-flex items-end gap-1 border-b-2 border-primary/30 pb-1"
      style={{ minWidth: `${widthCh}ch` }}
    >
      <input
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
        }}
        className={`bg-transparent outline-none text-right ${inputClassName}`}
        inputMode={inputMode}
        placeholder={placeholder}
      />
      {suffix && <span className="text-base font-semibold">{suffix}</span>}
    </span>
  );
}

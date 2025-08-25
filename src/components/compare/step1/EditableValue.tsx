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
  invalid?: boolean;
  bordered?: boolean;
}

function toDisplay(n: number | string, fmt?: "currency" | "percent") {
  if (n === "" || n === undefined || n === null) return "";
  const num = Number(n);
  if (!Number.isNaN(num)) {
    if (fmt === "currency") return num.toLocaleString();
    if (fmt === "percent") return String(num);
  }
  return String(n);
}

function parseDraft(s: string, fmt?: "currency" | "percent") {
  const raw = fmt === "currency" ? s.replace(/[^\d.-]/g, "") : s;
  const num = Number(raw);
  return Number.isFinite(num) ? num : s;
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
  invalid = false,
  bordered = true,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<string>(toDisplay(value ?? "", format));

  useEffect(() => {
    setDraft(toDisplay(value ?? "", format));
  }, [value, format]);

  const commit = () => {
    const parsed = parseDraft(draft, format);
    onChange(parsed);
    if (format === "currency" && typeof parsed === "number") {
      setDraft(parsed.toLocaleString());
    }
  };

  const cancel = () => {
    setDraft(toDisplay(value ?? "", format));
  };

  const borderColor = invalid ? "border-red" : "border-primary";

  return (
    <span
      className={[
        "inline-flex items-end gap-1 pb-1",
        bordered ? `border-b-2 ${borderColor}` : "",
        className,
      ].join(" ")}
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
        className={[
          "bg-transparent outline-none text-right",
          inputClassName,
        ].join(" ")}
        inputMode={inputMode}
        placeholder={placeholder}
      />
      {suffix && (
        <span className="text-base font-semibold text-primary">{suffix}</span>
      )}
    </span>
  );
}

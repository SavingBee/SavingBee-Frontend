import { useState } from "react";

interface CheckboxInputProps {
  id: string;
  name: string;
  value?: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
}

const Checkbox = ({
  id,
  name,
  value,
  label,
  checked: controlledChecked,
  onChange,
  inputClassName = "",
  labelClassName = "",
}: CheckboxInputProps) => {
  // 상태관리
  const [internalChecked, setInternalChecked] = useState(
    controlledChecked || false,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setInternalChecked(newChecked);
    onChange?.(e);
  };

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        className={`hidden ${inputClassName}`}
      />
      <label
        htmlFor={id}
        className={`flex items-center gap-1 cursor-pointer text-md ${labelClassName}`}
      >
        <span
          className={`flex items-center justify-center w-[18px] h-[18px] border rounded-[4px] ${isChecked ? "border-primary bg-primary" : "bg-white border-graye5"}`}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
            >
              <path
                d="M9 1L3.49268 7L1 4.6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label}
      </label>
    </div>
  );
};
export default Checkbox;

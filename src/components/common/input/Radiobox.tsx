import { useState } from "react";

interface RadioInputProps {
    id: string;
    name: string;
    value?: string;
    label: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputClassName?: string;
    labelClassName?: string;
}

const Radiobox = ({ id, name, value, label, checked: controlledChecked, onChange, inputClassName="", labelClassName="" }: RadioInputProps) => {
    // 상태관리
    const [internalChecked, setInternalChecked] = useState(controlledChecked || false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalChecked(e.target.checked);
        onChange?.(e);
    };

    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;


    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
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
                    className={`flex items-center justify-center w-[18px] h-[18px] border rounded-full ${isChecked ? "border-primary bg-primary" : "bg-white border-graye5"}`}
                >
                    {isChecked &&
                        <span className="w-[10px] h-[10px] bg-white rounded-full"></span>
                    }
                </span>
                {label}
            </label>
        </div>
    )
}
export default Radiobox;
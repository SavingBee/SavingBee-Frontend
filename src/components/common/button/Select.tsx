interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface SelectFieldProps {
    label?: string;
    id: string;
    name?: string;
    value?: string;
    placeholder?: string;
    options: SelectOption[];
    className?: string;
    selectClassName?: string;
    labelClassName?: string;
    variant: "lg" | "sm";
    disabled?: boolean;
    // onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChange?: (value: string) => void;
    required?: boolean; // 필수 필드인지
}

const Select = ({ label, id, name, value, placeholder, options, className = "", selectClassName = "", labelClassName = "", variant = "lg", disabled, onChange, required }: SelectFieldProps) => {
    const variantClass = variant === "lg"
        ? "h-[50px] p-[15px]" // lg style
        : "h-[34px] pr-[10px] pl-[10px]"; // sm style 

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className={labelClassName}>
                    {label}
                    {required && <span className="text-red font-bold">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`text-sm border border-graye5 rounded-md appearance-none min-h-0 ${variantClass} ${selectClassName}`}
                >
                    {placeholder && (
                        <option value="" hidden>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                    <path d="M9 0.928583L8.57811 0.5L4.5 4.64283L0.421888 0.5L0 0.928583L4.5 5.5L9 0.928583Z" fill="#444444" />
                </svg>
            </div>
        </div>
    )
}
export default Select;
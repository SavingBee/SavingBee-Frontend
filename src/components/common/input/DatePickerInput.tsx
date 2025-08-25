import { DatePicker } from 'react-datepicker';

import { FaRegCalendar } from "react-icons/fa6";

interface DatePickerInputProps {
    label?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    required?: boolean;
    className?: string;         // container 스타일
    labelClassName?: string;    // label 스타일
    inputClassName?: string;    // input box 스타일
    variant?: 'lg' | 'sm';
    maxDate?: Date | null;
    minDate?: Date | null;
}

const DatePickerInput = ({ label, id, name, placeholder, value, onChange, required, className, labelClassName, inputClassName, variant = "lg", maxDate, minDate }: DatePickerInputProps) => {
    const variantClass = variant === "lg"
        ? "h-[50px] p-[15px]" // lg style
        : "h-[34px] p-[12px]"; // sm style 

    return (
        <div className={`${className}`}>
            {label && (
                <label htmlFor={id} className={labelClassName}>
                    {label}
                    {required && <span className="text-red font-bold">*</span>}
                </label>
            )}
            <div className="relative">
                <DatePicker
                    id={id}
                    name={name}
                    selected={value}
                    onChange={onChange}
                    placeholderText={placeholder}
                    className={`text-sm border border-graye5 rounded-md ${variantClass} ${inputClassName}`}
                    dateFormat="yyyy-MM-dd"
                    minDate={minDate || undefined}
                    maxDate={maxDate || undefined}
                />
                <span className="absolute top-1/2 right-[15px] transform -translate-y-1/2">
                    <FaRegCalendar color="#444" />
                </span>
            </div>
        </div>
    )
}
export default DatePickerInput;
interface InputFieldProps {
    type: 'text' | 'password' | 'date' | 'number' | 'checkbox' | 'radio' | 'email' | 'tel' | 'url' | 'time';
    label?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    className?: string; // container 스타일
    labelClassName?: string; // label 스타일
    inputClassName?: string; // 추가 input 스타일
    variant? : 'lg' | 'sm';
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    disabled?: boolean;
    required?: boolean; // 필수 필드인지
}

const InputField1 = ({ type="text", label, id, name, placeholder, value, className="", labelClassName="", inputClassName="", variant = "lg", onChange, disabled, required }: InputFieldProps) => {
    const variantClass = variant === "lg"
        ? "h-[50px] p-[15px]" // lg style
        : "h-[34px] p-[12px]"; // sm style 
    
    return (
        <div className={`${className}`}>
            { label && <label htmlFor={id} className={`${labelClassName}`}>{label}{required && <span className="text-red font-bold">*</span>}</label> }
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`text-sm border border-graye5 rounded-md ${variantClass} ${inputClassName}`}
            />
        </div>
    )
}
export default InputField1;
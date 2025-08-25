interface TextareaFieldProps {
    label?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    className?: string;
    labelClassName?: string;
    textareaClassName?: string;
    rows?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    required?: boolean;
}

const TextareaField = ({ label, id, name, placeholder, value, className, labelClassName, textareaClassName, rows, onChange, disabled, required }: TextareaFieldProps) => {
    return (
        <div className={`${className}`}>
            {label && (
                <label htmlFor={id} className={`${labelClassName}`}>
                    {label}
                    {required && <span className="text-red font-bold">*</span>}
                </label>
            )}
            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                rows={rows}
                onChange={onChange}
                disabled={disabled}
                className={`text-sm border border-graye5 rounded-md p-[15px] resize-none ${textareaClassName}`}
            />
        </div>
    )
}
export default TextareaField;
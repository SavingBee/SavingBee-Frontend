interface IcnButtonProps {
    type: "button";
    icon: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    iconClassName?: string;
}

const IcnButton = ({ type, icon, children, disabled, onClick, className = "", iconClassName = "" }: IcnButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`flex items-center gap-1 font-bold text-sm ${className}`}
        >
            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${iconClassName}`}>
                {icon}
            </span>
            {children}
        </button>
    )
}
export default IcnButton;
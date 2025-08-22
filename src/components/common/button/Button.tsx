interface ButtonProps {
  type: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: (event: React.FormEvent) => void;
  className?: string;
  variant?: "lg" | "sm";
  styleVariant?: "bg" | "border";
}

const Button = ({
  type = "button",
  children,
  disabled,
  onClick,
  onSubmit,
  className = "",
  variant = "lg",
  styleVariant = "bg",
}: ButtonProps) => {
  const variantClass =
    variant === "lg"
      ? "w-full h-[50px]" // lg style
      : "h-[34px] pt-0 pb-0 pr-[16px] pl-[16px] text-sm"; // sm style

  const stylevariantClass = styleVariant === "bg" ? "text-white" : "border";

  const handleSubmit = (event: React.FormEvent) => {
    if (onSubmit) {
      onSubmit(event); // onSubmit이 있을 경우 호출
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onSubmit={type === "submit" ? handleSubmit : undefined}
      className={`font-bold text-base rounded-md ${stylevariantClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;

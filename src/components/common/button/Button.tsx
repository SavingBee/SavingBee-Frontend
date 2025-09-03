type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "onSubmit"
> & {
  type: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
  // onClick?: () => void;
  // onSubmit?: (event: React.FormEvent) => void;
  // *********** 버튼 타입 확장
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  onSubmit?: (event: React.FormEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "lg" | "sm";
  styleVariant?: "bg" | "border";
};

const Button = ({
  type,
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

  // const handleSubmit = (event: React.FormEvent) => {
  //   if (onSubmit) {
  //     onSubmit?.(event); // onSubmit이 있을 경우 호출
  //   }
  // };
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (type === "submit") {
      onSubmit?.(e as unknown as React.FormEvent<HTMLButtonElement>);
    }
  };

  return (
    <button
      type={type}
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

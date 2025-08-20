import { ReactNode } from "react";

interface StepItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

const StepItem = ({ icon, label, active = false }: StepItemProps) => {
  return (
    <div>
      <div
        className={`flex items-center justify-center w-[58px] h-[58px] rounded-full border ${
          active ? 'border-primary bg-primary' : 'border-graye5 bg-grayf9'
        }`}
      >
        {icon}
      </div>
      <p
        className={`text-sm text-center mt-2 ${
          active ? 'font-bold text-primary' : 'font-medium text-gray9'
        }`}
      >
        {label}
      </p>
    </div>
  );
};
export default StepItem;

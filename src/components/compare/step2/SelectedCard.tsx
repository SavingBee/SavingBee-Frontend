import Button from "@/components/common/button/Button";
import { IoClose } from "react-icons/io5";

import { PiNotePencil } from "react-icons/pi";

interface SelectedCardProps {
  selectNum: number;
  item: {
    bankName: string;
    productName: string;
  };
  onClose?: () => void;
}

export default function SelectedCard({
  selectNum,
  item,
  onClose,
}: SelectedCardProps) {
  return (
    <div
      className={`relative ${selectNum === 0 ? "bg-purple" : "bg-cyan"} rounded-lg w-[399px] h-[212px] m-2 flex justify-center items-center`}
    >
      <Button
        type="button"
        variant="sm"
        styleVariant="bg"
        className="absolute right-4 top-4 !h-6 !w-6 !p-0 !rounded-full bg-white flex items-center justify-center"
        onClick={onClose}
      >
        <IoClose size={16} className="text-gray-700" />
      </Button>

      <div className="text-center">
        <div className="text-white text-bold text-sm">{item.bankName}</div>
        <div className="text-white text-bold text-lg">{item.productName}</div>
        <Button type="button" variant="sm" styleVariant="bg">
          <div className="flex leading-none">
            <PiNotePencil size={17} />
            <span className="ml-2 text-sm">자세히 보기</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

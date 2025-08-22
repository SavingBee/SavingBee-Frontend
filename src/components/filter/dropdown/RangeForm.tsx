// import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import { PiTilde } from "react-icons/pi";
import type { ChangeEvent } from "react";

interface RangeFormProps {
  minValue?: number;
  maxValue?: number;
  onChangeMin: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMax: (e: ChangeEvent<HTMLInputElement>) => void;
  // onApply?: () => void;
}

export default function RangeForm({
  minValue,
  maxValue,
  onChangeMin,
  onChangeMax,
  // onApply,
}: RangeFormProps) {
  return (
    <div className="flex items-center gap-2 pb-4  w-[330px] rounded-md">
      <InputField1
        type="text"
        variant="sm"
        placeholder="최저 값"
        value={minValue}
        onChange={onChangeMin}
        inputClassName="border border-graye5 rounded-md py-2 px-3 outline-none w-24"
      />
      <PiTilde />
      <InputField1
        type="text"
        variant="sm"
        placeholder="최고 값"
        value={maxValue}
        onChange={onChangeMax}
        inputClassName="border border-graye5 rounded-md py-2 px-3 outline-none w-24"
      />
      {/* <Button
        type="button"
        styleVariant="bg"
        variant="sm"
        className="bg-primary"
        onClick={onApply}
      >
        적용
      </Button> */}
    </div>
  );
}

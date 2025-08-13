import { useState } from "react";
import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import type { AmountFilter } from "@/types/searchFilter";

type AmountFormProps = {
  aFilter: AmountFilter;
  value?: number;
  onChange: (v: number | undefined) => void;
  onApply: () => void;
};

export default function AmountForm({ aFilter, onApply }: AmountFormProps) {
  const [display, setDisplay] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const data = e.target.value;
    setDisplay(data);
  };

  return (
    <div className="flex items-center gap-2 w-[360px] border p-4 rounded-md">
      <div className="relative flex-1">
        <InputField1
          type="text"
          variant="sm"
          inputClassName="border-graye5 rounded-md py-3 outline-none pr-10"
          placeholder={
            aFilter.placeholder ??
            (aFilter.unit ? `금액 입력 (${aFilter.unit})` : "금액 입력")
          }
          value={display}
          onChange={handleChange}
        />
        {aFilter.unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {aFilter.unit}
          </span>
        )}
      </div>

      <Button
        type="button"
        variant="sm"
        styleVariant="bg"
        className="bg-primary py-6"
        onClick={onApply}
      >
        적용
      </Button>
    </div>
  );
}

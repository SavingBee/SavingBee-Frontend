// import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import type { AmountFilter } from "@/types/uiFilter";
import type { ChangeEvent } from "react";
import { formatNumber } from "@/utils/number";

type AmountFormProps = {
  aFilter: AmountFilter;
  value?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // onApply: () => void;
};

export default function AmountForm({
  aFilter,
  value,
  onChange,
  // onApply,
}: AmountFormProps) {
  return (
    <div className="flex items-center gap-2 pb-4 rounded-md">
      <InputField1
        type="text"
        variant="lg"
        inputClassName="border-gray5 rounded-md py-3 outline-none pr-10"
        placeholder={
          aFilter.placeholder ??
          (aFilter.unit ? `금액 입력 (${aFilter.unit})` : "금액 입력")
        }
        value={formatNumber(value) ?? ""}
        onChange={onChange}
      />
      {/* <Button
        type="button"
        variant="sm"
        styleVariant="bg"
        className="bg-primary h-[34px] px-4 whitespace-nowrap leading-none"
        // onClick={onApply}
      >
        <span>적용</span>
      </Button> */}
    </div>
  );
}

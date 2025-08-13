import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import { PiTilde } from "react-icons/pi";

export default function RangeForm() {
  return (
    <div className="flex border p-4 items-center gap-2 w-[330px] rounded-md">
      <InputField1
        type="text"
        variant="sm"
        inputClassName="border-graye5 rounded-md py-3 outline-none w-24"
        placeholder="최저 값"
      />
      <PiTilde />
      <InputField1
        type="text"
        variant="sm"
        inputClassName="border-graye5 rounded-md py-3 outline-none w-24"
        placeholder="최고 값"
      />
      <Button
        type="button"
        styleVariant="bg"
        variant="sm"
        className="bg-primary py-6"
      >
        적용
      </Button>
    </div>
  );
}

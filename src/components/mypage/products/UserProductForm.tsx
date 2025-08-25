import Button from "@/components/common/button/Button";
import Select from "@/components/common/button/Select";
import DatePickerInput from "@/components/common/input/DatePickerInput";
import InputField1 from "@/components/common/input/InputField1";
import TextareaField from "@/components/common/input/TextareaField";
import { useState } from "react";

const UserProductForm = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    return (
        <form className="border-t border-gray9">
            <div className="flex gap-5 w-full pt-6">
                <Select
                    label="은행명"
                    id="bankName"
                    name="bankName"
                    options={[
                        { label: "신한은행", value: "신한은행" },
                        { label: "국민은행", value: "국민은행" },
                    ]}
                    variant="lg"
                    className="w-full"
                    selectClassName="w-full"
                    labelClassName="font-bold text-sm text-black6 mb-1"
                />
                <Select
                    label="상품유형"
                    id="bankName"
                    name="bankName"
                    options={[
                        { label: "신한은행", value: "신한은행" },
                        { label: "국민은행", value: "국민은행" },
                    ]}
                    variant="lg"
                    className="w-full"
                    selectClassName="w-full"
                    labelClassName="font-bold text-sm text-black6 mb-1"
                />
            </div>
            <div className="pt-6">
                <InputField1
                    type="text"
                    label="상품명"
                    placeholder="상품명을 입력해주세요. 예) KB Star 정기예금"
                    inputClassName="w-full"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                    required
                />
            </div>
            <div className="flex gap-5 w-full pt-6">
                <InputField1
                    type="text"
                    label="금리"
                    placeholder="금리를 입력해주세요. 예) 2.4"
                    className="w-full"
                    inputClassName="w-full"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                    required
                />
                <InputField1
                    type="text"
                    label="가입 금액(원)"
                    placeholder="가입 금액을 입력해주세요. 예) 1000000"
                    className="w-full"
                    inputClassName="w-full"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                    required
                />
            </div>
            <div className="pt-6">
                <InputField1
                    type="text"
                    label="가입개월수"
                    placeholder="가입개월수를 입력해주세요. 예) 12"
                    inputClassName="w-full"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                    required
                />
            </div>
            <div className="flex gap-5 w-full pt-6">
                <DatePickerInput
                    label="가입일"
                    id="startDate"
                    name="startDate"
                    placeholder="가입일을 입력해주세요."
                    value={startDate}
                    onChange={setStartDate}
                    required
                    className="w-full"
                    inputClassName="w-full"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                    maxDate={endDate} // 만기일보다 늦게 선택 못 하게 제한
                />
                <DatePickerInput
                    label="만기일"
                    id="endDate"
                    name="endDate"
                    placeholder="만기일을 입력해주세요."
                    value={endDate}
                    onChange={setEndDate}
                    required
                    className="w-full"
                    inputClassName="w-full"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                    minDate={startDate} // 시작일보다 빠르게 선택 못 하게 제한
                />
            </div>
            <div className="pt-6">
                <TextareaField
                    label="메모"
                    placeholder="추가정보나 특이사항을 입력해주세요."
                    textareaClassName="w-full h-[150px]"
                    labelClassName="block font-bold text-sm text-black6 mb-1"
                />
            </div>
            <div className="max-w-[400px] w-full mx-auto flex gap-2 mt-6">
                <Button
                    type="button"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    이전
                </Button>
                <Button
                    type="submit"
                    className="text-white bg-primary"
                >
                    다음
                </Button>
            </div>
        </form>
    )
}
export default UserProductForm;
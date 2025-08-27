import Button from "@/components/common/button/Button";
import Select from "@/components/common/button/Select";
import Checkbox from "@/components/common/input/Checkbox";
import InputField1 from "@/components/common/input/InputField1";
import Radiobox from "@/components/common/input/Radiobox";
import Modal from "@/components/common/modal/Modal"
import { useMemo, useState } from "react";

type AlertType = "EMAIL" | "SNS" | "PUSH";
const ALLOWED_MONTHS = [6, 12, 24, 36] as const;
type TermMonth = (typeof ALLOWED_MONTHS)[number] | "";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
    const [alertType, setAlertType] = useState<AlertType>("EMAIL");
    const [rate, setRate] = useState<string>("");
    const [term, setTerm] = useState<TermMonth>("");

    const rateNum = useMemo(() => {
        const n = Number(rate);
        return Number.isFinite(n) ? n : NaN;
    }, [rate]);

    const validAlertType =
        alertType === "EMAIL" || alertType === "SNS" || alertType === "PUSH";
    const validRate = Number.isFinite(rateNum) && rateNum > 0;
    const validTerm = term !== "";

    const isValid = validAlertType && validRate && validTerm;

    // 예치 기간 Select 옵션
    const termOptions = ALLOWED_MONTHS.map((month) => ({
        label: `${month}개월`,
        value: String(month),
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} modalTitle="상품 알림 설정">
            <div>
                <strong className="block font-bold text-sm text-black6 mb-1">알림방식</strong>
                <div className="flex gap-5 mt-2">
                    {(["EMAIL", "SNS", "PUSH"] as const).map((v) => (
                        <Radiobox
                            key={v}
                            id={`alert_${v.toLowerCase()}`}
                            name="alert_type"
                            value={v}
                            label={v === "EMAIL" ? "이메일" : v.toLowerCase()}
                            checked={alertType === v}
                            onChange={(e) => setAlertType(e.target.value as AlertType)}
                            labelClassName="font-medium text-sm"
                        />
                    ))}
                </div>
            </div>
            <InputField1
                type="text"
                label="연이율"
                onChange={(e) => setRate(e.target.value)}
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
                addonText="% 이상"
            />
            <div>
                <strong className="block font-bold text-sm text-black6 mb-1 mt-4">이자 계산 방식</strong>
                <div className="flex gap-5 mt-2">
                    <Checkbox id="1" name="simple_interest" label="단리" labelClassName="text-sm" />
                    <Checkbox id="2" name="compound_interest" label="복리" labelClassName="text-sm" />
                </div>
            </div>
            <Select
                label="예치 기간"
                id="depositPeriod"
                options={termOptions}
                placeholder="기간 선택"
                variant="lg"
                onChange={(e) => {
                    const v = e.target.value;
                    setTerm(v === "" ? "" : (Number(v) as TermMonth));
                }}
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
                selectClassName="w-full"
            />
            <InputField1
                type="text"
                label="최소 가입 금액"
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
                addonText="원"
            />
            <InputField1
                type="text"
                label="최대 한도"
                inputClassName="w-full"
                labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
                addonText="원"
            />
            <div>
                <strong className="block font-bold text-sm text-black6 mb-1 mt-4">적립 방식</strong>
                <div className="flex gap-5 mt-2">
                    <Checkbox id="3" name="flexible" label="자유적립" labelClassName="text-sm" />
                    <Checkbox id="4" name="fixed" label="정액적립" labelClassName="text-sm" />
                </div>
            </div>
            <Button
                type="submit"
                styleVariant="bg"
                variant="lg"
                disabled={!isValid}
                className={`rounded-md w-40 text-lg mt-4 ${isValid
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                    }`}
            >
                설정
            </Button>
        </Modal>
    )
}
export default AlertModal;
import Button from "@/components/common/button/Button";
import Checkbox from "@/components/common/input/Checkbox";
import InputField1 from "@/components/common/input/InputField1";
import Radiobox from "@/components/common/input/Radiobox";
import { useMemo, useState } from "react";
import { IoClose } from "react-icons/io5";

type AlertType = "EMAIL" | "SNS" | "PUSH";
const ALLOWED_MONTHS = [6, 12, 24, 36] as const;
type TermMonth = (typeof ALLOWED_MONTHS)[number] | "";

interface AlertModalProps {
  closeAlert?: () => void;
}

export default function AlertModal({ closeAlert }: AlertModalProps) {
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 rounded-lg"
      onClick={closeAlert}
    >
      <div
        className="rounded-md bg-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center bg-primary text-white px-6 py-4 rounded-t-md">
          <div className="text-lg font-bold">상품 알림 설정</div>
          <IoClose size={20} onClick={closeAlert} className="cursor-pointer" />
        </div>

        <div className="px-10 py-5">
          <div className="flex gap-4 items-center my-3">
            <div className="shrink-0">알림방식</div>
            {(["EMAIL", "SNS", "PUSH"] as const).map((v) => (
              <Radiobox
                key={v}
                id={`alert_${v.toLowerCase()}`}
                name="alert_type"
                value={v}
                label={v === "EMAIL" ? "이메일" : v.toLowerCase()}
                checked={alertType === v}
                onChange={(e) => setAlertType(e.target.value as AlertType)}
                labelClassName="font-bold text-base"
              />
            ))}
          </div>

          <div className="flex items-end gap-2 my-4">
            <InputField1
              type="text"
              label="연이율"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              inputClassName={`m-2 ${rate !== "" && !validRate ? "border-red-400" : ""}`}
              placeholder="0.0"
            />
            <span className="pb-3">% 이상</span>
          </div>

          <div className="flex items-end gap-4 my-4">
            <div className="mt-3">이자 계산 방식</div>
            <Checkbox id="1" name="simple_interest" label="단리" />
            <Checkbox id="2" name="compound_interest" label="복리" />
          </div>

          <div className="my-4">
            <label htmlFor="term" className="mr-2">
              예치 기간
            </label>
            <select
              id="term"
              className={`border rounded-md px-3 py-2 ${!validTerm ? "border-red-400" : ""}`}
              value={term}
              onChange={(e) => {
                const v = e.target.value;
                setTerm(v === "" ? "" : (Number(v) as TermMonth));
              }}
            >
              <option value="">기간 선택</option>
              {ALLOWED_MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}개월
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2 my-3">
            <InputField1
              type="text"
              label="최소 가입 금액"
              inputClassName="m-2"
            />
            <span className="pb-3">원</span>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <InputField1 type="text" label="최대 한도" inputClassName="m-2" />
            <span className="pb-3">원</span>
          </div>
          <div className="flex items-end gap-4 mt-3 mb-6">
            <div className="mt-3">적립 방식</div>
            <Checkbox id="3" name="flexible" label="자유적립" />
            <Checkbox id="4" name="fixed" label="정액적립" />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              styleVariant="bg"
              variant="sm"
              disabled={!isValid}
              className={`rounded-md w-40 text-lg ${
                isValid
                  ? "bg-primary hover:bg-primary/90 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-500"
              }`}
            >
              설정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

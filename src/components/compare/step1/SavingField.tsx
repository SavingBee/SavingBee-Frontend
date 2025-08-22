import { useEffect, useState } from "react";
import EditableValue from "./EditableValue";
import { SavingsFilter } from "./PlanFilter";

interface SavingFieldProps {
  onChange?: (f: SavingsFilter, valid: boolean) => void;
}

export function SavingField({ onChange }: SavingFieldProps) {
  const [amount, setAmount] = useState<number | "">("");
  const [months, setMonths] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");
  const [rateType, setRateType] = useState<"단리" | "복리" | "">("");

  const [touched, setTouched] = useState({
    amount: false,
    months: false,
    rate: false,
    rateType: false,
  });

  const validAmount =
    typeof amount === "number" && amount > 0 && amount <= 10_000_000;
  const validMonths =
    typeof months === "number" &&
    Number.isInteger(months) &&
    months >= 1 &&
    months <= 120;
  const validRate = typeof rate === "number" && rate > 0 && rate <= 20;
  const validRateType = rateType === "단리" || rateType === "복리";

  const valid = validAmount && validMonths && validRate && validRateType;

  useEffect(() => {
    onChange?.(
      {
        amount: typeof amount === "number" ? amount : undefined,
        months: typeof months === "number" ? months : undefined,
        rate: typeof rate === "number" ? rate : undefined,
        rateType,
      },
      valid,
    );
  }, [amount, months, rate, rateType, valid, onChange]);

  return (
    <div className="w-full rounded-md border border-graye5 bg-grayf9">
      <div className="grid grid-cols-4 divide-x divide-graye5">
        <div className="p-6">
          <div className="text-base text-gray6">매월 저축금액</div>
          <div
            className={`mt-2 ${touched.amount && !validAmount ? "border-b-2 border-red-400" : ""}`}
          >
            <EditableValue
              value={amount}
              onChange={(v) => {
                setAmount(typeof v === "number" ? v : "");
                setTouched((t) => ({ ...t, amount: true }));
              }}
              placeholder="0"
              suffix="원"
              format="currency"
              inputMode="numeric"
              className="text-[28px] font-bold text-primary"
              inputClassName="text-[28px] font-bold text-primary w-40 text-right"
            />
          </div>
          {touched.amount && !validAmount && (
            <p className="mt-1 text-xs text-red-500">
              1원 이상 1,000만원 이하로 입력하세요.
            </p>
          )}
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">저축기간</div>
          <div
            className={`mt-3 ${touched.months && !validMonths ? "border-b-2 border-red-400" : ""}`}
          >
            <EditableValue
              value={months}
              onChange={(v) => {
                setMonths(typeof v === "number" ? Math.trunc(v) : "");
                setTouched((t) => ({ ...t, months: true }));
              }}
              placeholder="0"
              suffix="개월"
              className="text-[28px] font-bold text-primary"
              inputClassName="text-[28px] font-bold text-primary w-24 text-right"
              inputMode="numeric"
            />
          </div>
          {touched.months && !validMonths && (
            <p className="mt-1 text-xs text-red-500">
              1~120 사이의 정수(개월)로 입력하세요.
            </p>
          )}
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">연 이자율</div>
          <div
            className={`mt-3 ${touched.rate && !validRate ? "border-b-2 border-red-400" : ""}`}
          >
            <EditableValue
              value={rate}
              onChange={(v) => {
                setRate(typeof v === "number" ? v : "");
                setTouched((t) => ({ ...t, rate: true }));
              }}
              placeholder="0.0"
              suffix="%"
              format="percent"
              className="text-[28px] font-bold text-primary"
              inputClassName="text-[28px] font-bold text-primary w-24 text-right"
              inputMode="decimal"
            />
          </div>
          {touched.rate && !validRate && (
            <p className="mt-1 text-xs text-red-500">
              0 ~ 20%이하 이자를 입력하세요.
            </p>
          )}
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">금리방식</div>
          <select
            className={`mt-3 w-full bg-transparent border-b-2 pb-1 text-[22px] font-bold outline-none ${
              touched.rateType && !validRateType
                ? "border-red-400 text-red-500"
                : "border-primary text-primary"
            }`}
            value={rateType}
            onChange={(e) => {
              setRateType(e.target.value as "단리" | "복리" | "");
              setTouched((t) => ({ ...t, rateType: true }));
            }}
          >
            <option value="" disabled>
              선택
            </option>
            <option value="복리">복리</option>
            <option value="단리">단리</option>
          </select>
          {touched.rateType && !validRateType && (
            <p className="mt-1 text-xs text-red-500">금리방식을 선택하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}

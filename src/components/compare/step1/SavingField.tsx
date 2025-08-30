import { useEffect, useState } from "react";
import EditableValue from "./EditableValue";
import { SavingsFilter } from "@/types/compare";

const MIN_SAVINGS_AMOUNT = 10_000;
const MAX_SAVINGS_AMOUNT = 3_000_000;
const MIN_SAVINGS_RATE = 0.1;
const MAX_SAVINGS_RATE = 5;

const ALLOWED_MONTHS = [6, 12, 24, 36] as const;

interface SavingFieldProps {
  onChange?: (f: SavingsFilter, valid: boolean) => void;
}

export function SavingField({ onChange }: SavingFieldProps) {
  const [amount, setAmount] = useState<number | "">("");
  const [months, setMonths] = useState<number | "">("");
  const [minRate, setMinRate] = useState<number | "">("");
  const [rateType, setRateType] = useState<"단리" | "복리">();

  const [touched, setTouched] = useState({
    amount: false,
    months: false,
    minRate: false,
    rateType: false,
  });

  const validAmount =
    typeof amount === "number" &&
    amount >= MIN_SAVINGS_AMOUNT &&
    amount <= MAX_SAVINGS_AMOUNT;

  const validMonths =
    typeof months === "number" &&
    ALLOWED_MONTHS.includes(months as (typeof ALLOWED_MONTHS)[number]);

  const validMinRate =
    typeof minRate === "number" &&
    minRate >= MIN_SAVINGS_RATE &&
    minRate <= MAX_SAVINGS_RATE;

  const validMaxRate =
    typeof minRate === "number" &&
    minRate >= MIN_SAVINGS_RATE &&
    minRate <= MAX_SAVINGS_RATE;

  const validRates = validMinRate && validMaxRate;

  const validRateType = rateType === "단리" || rateType === "복리";

  const valid = validAmount && validMonths && validRates && validRateType;
  useEffect(() => {
    onChange?.(
      {
        kind: "savings",
        amount: typeof amount === "number" ? amount : undefined,
        months:
          typeof months === "number" ? (months as 6 | 12 | 24 | 36) : undefined,
        minRate: typeof minRate === "number" ? minRate : undefined,
        rateType,
      },
      valid,
    );
  }, [amount, months, minRate, rateType, valid, onChange]);

  const showAmountErr = touched.amount && !validAmount;
  const showMonthsErr = touched.months && !validMonths;
  const showRatesErr = touched.minRate && !validRates;
  const showRateTypeErr = touched.rateType && !validRateType;

  return (
    <div className="w-full rounded-md border border-graye5 bg-grayf9">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-graye5">
        <div className="p-6">
          <div className="text-base text-gray6">저축금액</div>
          <span className="text-primary font-bold">매월</span>
          {showAmountErr && (
            <p className="mt-1 text-base text-red">
              만원 이상 300만원 이하로 입력하세요.
            </p>
          )}
          <div className="flex flex-col mt-2 items-start">
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
              inputClassName="text-[28px] font-bold text-primary w-40 "
              invalid={showAmountErr}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">저축기간</div>
          {showMonthsErr && (
            <p className="mt-1 text-base text-red">
              {ALLOWED_MONTHS.join(" / ")} 개월 중에서 선택하세요.
            </p>
          )}
          <div className="mt-2 h-[64px] flex items-end">
            <select
              className={`mt-3 w-40 bg-transparent border-b-2 pb-1 text-[28px] font-bold outline-none ${
                showMonthsErr
                  ? "border-red-400 text-red"
                  : "border-primary text-primary"
              }`}
              value={months === "" ? "" : String(months)}
              onChange={(e) => {
                const v = e.target.value;
                setMonths(v === "" ? "" : Number(v));
                setTouched((t) => ({ ...t, months: true }));
              }}
            >
              <option value="">선택</option>
              {ALLOWED_MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}개월
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">최소 이자율</div>
          {showRatesErr && (
            <div className="mt-1 space-y-1">
              {(!validMinRate || !validMaxRate) && (
                <p className="text-base text-red">
                  이자율은 {MIN_SAVINGS_RATE}% ~ {MAX_SAVINGS_RATE}% 사이로
                  입력하세요.
                </p>
              )}
            </div>
          )}
          <div className="mt-2 h-[64px] flex items-end gap-2">
            <EditableValue
              value={minRate}
              onChange={(v) => {
                setMinRate(typeof v === "number" ? v : "");
                setTouched((t) => ({ ...t, minRate: true }));
              }}
              placeholder="0.0"
              suffix="%"
              format="percent"
              className="text-[28px] font-bold text-primary"
              inputClassName="text-[28px] font-bold text-primary w-20"
              inputMode="decimal"
              invalid={showRatesErr}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">금리방식</div>
          {showRateTypeErr && (
            <p className="mt-1 text-base text-red">금리방식을 선택하세요.</p>
          )}
          <div className="mt-2 h-[64px] flex items-end">
            <select
              className={`mt-3 w-40 bg-transparent border-b-2 pb-1 text-[28px] font-bold outline-none ${
                showRateTypeErr
                  ? "border-red-400 text-red"
                  : "border-primary text-primary"
              }`}
              value={rateType}
              onChange={(e) => {
                setRateType(e.target.value as "단리" | "복리");
                setTouched((t) => ({ ...t, rateType: true }));
              }}
            >
              <option value="">선택</option>
              <option value="단리">단리</option>
              <option value="복리">복리</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

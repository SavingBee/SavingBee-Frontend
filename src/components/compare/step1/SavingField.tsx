import { useEffect, useState } from "react";
import EditableValue from "./EditableValue";
import type { SavingsFilter } from "./PlanFilter";

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
  const [maxRate, setMaxRate] = useState<number | "">("");

  const [rateType, setRateType] = useState<"단리" | "복리" | "any">();

  const [touched, setTouched] = useState({
    amount: false,
    months: false,
    minRate: false,
    maxRate: false,
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
    typeof maxRate === "number" &&
    maxRate >= MIN_SAVINGS_RATE &&
    maxRate <= MAX_SAVINGS_RATE;

  const validRateOrder =
    typeof minRate === "number" &&
    typeof maxRate === "number" &&
    minRate <= maxRate;

  const validRates = validMinRate && validMaxRate && validRateOrder;

  const validRateType =
    rateType === "단리" || rateType === "복리" || rateType === "any";

  const valid = validAmount && validMonths && validRates && validRateType;

  useEffect(() => {
    onChange?.(
      {
        amount: typeof amount === "number" ? amount : undefined,
        months: typeof months === "number" ? months : undefined,
        minRate: typeof minRate === "number" ? minRate : undefined,
        maxRate: typeof maxRate === "number" ? maxRate : undefined,
        rateType,
      } as unknown as SavingsFilter,
      valid,
    );
  }, [amount, months, minRate, maxRate, rateType, valid, onChange]);

  const showAmountErr = touched.amount && !validAmount;
  const showMonthsErr = touched.months && !validMonths;
  const showRatesErr = (touched.minRate || touched.maxRate) && !validRates;
  const showRateTypeErr = touched.rateType && !validRateType;

  return (
    <div className="w-full rounded-md border border-graye5 bg-grayf9">
      <div className="grid grid-cols-4 divide-x divide-graye5">
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
              inputClassName="text-[28px] font-bold text-primary w-40"
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
              className={`mt-3 w-full bg-transparent border-b-2 pb-1 text-[28px] font-bold outline-none ${
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
          <div className="text-base text-gray6">연 이자율</div>
          {showRatesErr && (
            <div className="mt-1 space-y-1">
              {(!validMinRate || !validMaxRate) && (
                <p className="text-base text-red">
                  이자율은 {MIN_SAVINGS_RATE}% ~ {MAX_SAVINGS_RATE}% 사이로
                  입력하세요.
                </p>
              )}
              {validMinRate && validMaxRate && !validRateOrder && (
                <p className="text-base text-red">
                  최소 이자율이 최대 이자율보다 클 수 없어요.
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
            <span className="px-2 text-gray-500 text-[20px]">~</span>
            <EditableValue
              value={maxRate}
              onChange={(v) => {
                setMaxRate(typeof v === "number" ? v : "");
                setTouched((t) => ({ ...t, maxRate: true }));
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
              className={`mt-3 w-full bg-transparent border-b-2 pb-1 text-[28px] font-bold outline-none ${
                showRateTypeErr
                  ? "border-red-400 text-red"
                  : "border-primary text-primary"
              }`}
              value={rateType}
              onChange={(e) => {
                setRateType(e.target.value as "단리" | "복리" | "any");
                setTouched((t) => ({ ...t, rateType: true }));
              }}
            >
              <option value="">선택</option>
              <option value="단리">단리</option>
              <option value="복리">복리</option>
              <option value="any">상관없음</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

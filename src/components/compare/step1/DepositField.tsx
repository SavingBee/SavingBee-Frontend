import { useEffect, useState } from "react";
import EditableValue from "./EditableValue";
import { DepositFilter } from "@/types/compare";

interface DepositFieldProps {
  onChange?: (f: DepositFilter, valid: boolean) => void;
}

const MIN_DEPOSIT_PRINCIPAL = 100_000;
const MIN_DEPOSIT_RATE = 0.1;

const ALLOWED_MONTHS = [6, 12, 24, 36] as const;

export function DepositField({ onChange }: DepositFieldProps) {
  const [principal, setPrincipal] = useState<number | "">("");
  const [months, setMonths] = useState<number | "">("");
  const [minRate, setMinRate] = useState<number | "">("");
  const [rateType, setRateType] = useState<"단리" | "복리">();

  const [touched, setTouched] = useState({
    principal: false,
    months: false,
    minRate: false,
    rateType: false,
  });

  const validPrincipal =
    typeof principal === "number" && principal >= MIN_DEPOSIT_PRINCIPAL;

  const validMonths =
    typeof months === "number" &&
    ALLOWED_MONTHS.includes(months as (typeof ALLOWED_MONTHS)[number]);

  const validMinRate =
    typeof minRate === "number" && minRate >= MIN_DEPOSIT_RATE;

  const validRateType = rateType === "단리" || rateType === "복리";

  const valid = validPrincipal && validMonths && validMinRate && validRateType;

  useEffect(() => {
    onChange?.(
      {
        kind: "deposit",
        principal: typeof principal === "number" ? principal : undefined,
        months:
          typeof months === "number" ? (months as 6 | 12 | 24 | 36) : undefined,
        minRate: typeof minRate === "number" ? minRate : undefined,
        rateType,
      } as DepositFilter,
      valid,
    );
  }, [principal, months, minRate, rateType, valid, onChange]);

  const showPrincipalError = touched.principal && !validPrincipal;
  const showMonthsErr = touched.months && !validMonths;
  const showRateError = touched.minRate && !validMinRate;
  const showRateTypeErr = touched.rateType && !validRateType;

  return (
    <div className="w-full rounded-md border border-graye5 bg-grayf9">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-x divide-graye5">
        <div className="p-6">
          <div className="text-base text-gray6">예금액</div>
          {showPrincipalError && (
            <p className="mt-1 text-red text-sm">10만원 이상 입력해주세요.</p>
          )}
          <div className="mt-3">
            <EditableValue
              value={principal}
              onChange={(v) => {
                setPrincipal(typeof v === "number" ? v : "");
                setTouched((t) => ({ ...t, principal: true }));
              }}
              placeholder="0"
              suffix="원"
              format="currency"
              className="text-[28px] font-bold text-primary"
              inputClassName="text-[28px] font-bold text-primary w-40"
              inputMode="numeric"
              invalid={showPrincipalError}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">저축기간</div>
          {showMonthsErr && (
            <p className="mt-1 text-sm text-red">
              {ALLOWED_MONTHS.join(" / ")} 개월 중 선택하세요.
            </p>
          )}

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

        <div className="p-6">
          <div className="text-base text-gray6">최소 이자율</div>
          {showRateError && (
            <p className="mt-1 text-sm text-red">
              이자율은 {MIN_DEPOSIT_RATE}% 이상 입력해주세요.
            </p>
          )}
          <div className="mt-3">
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
              invalid={showRateError}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">금리방식</div>
          {showRateTypeErr && (
            <p className="mt-1 text-sm text-red">금리방식을 선택하세요.</p>
          )}
          <select
            className={`mt-3 w-40 bg-transparent border-b-2 pb-1 text-[28px] font-bold outline-none ${
              showRateTypeErr
                ? "border-red-400 text-red"
                : "border-primary text-primary"
            }`}
            value={rateType ?? ""}
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
  );
}

import { useEffect, useState } from "react";
import EditableValue from "./EditableValue";
import type { DepositFilter } from "./PlanFilter";
import { PiTilde } from "react-icons/pi";

interface DepositFieldProps {
  onChange?: (f: DepositFilter, valid: boolean) => void;
}

const MIN_DEPOSIT_PRINCIPAL = 100_000;
const MIN_DEPOSIT_RATE = 0.1;
const MAX_DEPOSIT_RATE = 5; 

export function DepositField({ onChange }: DepositFieldProps) {
  const [principal, setPrincipal] = useState<number | "">("");
  const [minRate, setMinRate] = useState<number | "">("");
  const [maxRate, setMaxRate] = useState<number | "">("");

  const [touched, setTouched] = useState({
    principal: false,
    minRate: false,
    maxRate: false,
  });

  const validPrincipal =
    typeof principal === "number" && principal >= MIN_DEPOSIT_PRINCIPAL;

  const validMinRate =
    typeof minRate === "number" &&
    minRate >= MIN_DEPOSIT_RATE &&
    minRate <= MAX_DEPOSIT_RATE;

  const validMaxRate =
    typeof maxRate === "number" &&
    maxRate >= MIN_DEPOSIT_RATE &&
    maxRate <= MAX_DEPOSIT_RATE;

  const validRateOrder =
    typeof minRate === "number" &&
    typeof maxRate === "number" &&
    minRate <= maxRate;

  const validRates = validMinRate && validMaxRate && validRateOrder;
  const valid = validPrincipal && validRates;

  useEffect(() => {
    onChange?.(
      {
        principal: typeof principal === "number" ? principal : undefined,
        minRate: typeof minRate === "number" ? minRate : undefined,
        maxRate: typeof maxRate === "number" ? maxRate : undefined,
      } as unknown as DepositFilter,
      valid,
    );
  }, [principal, minRate, maxRate, valid, onChange]);

  const showPrincipalError = touched.principal && !validPrincipal;
  const showRateError = (touched.minRate || touched.maxRate) && !validRates;

  return (
    <div className="w-full rounded-md border border-graye5 bg-grayf9">
      <div className="grid grid-cols-2 divide-x divide-graye5">
        <div className="p-6">
          <div className="text-base text-gray6">예금액</div>
          <div className="mt-3">
            {touched.principal && !validPrincipal && (
              <p className="mt-1 text-lg text-red">10만원 이상 입력해주세요.</p>
            )}
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
              inputClassName="text-[28px] font-bold text-primary w-48"
              inputMode="numeric"
              invalid={showPrincipalError}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="text-base text-gray6">연 이자율</div>
          {(touched.minRate || touched.maxRate) && !validRates && (
            <div className="mt-1 space-y-1">
              {(!validMinRate || !validMaxRate) && (
                <p className="text-lg text-red">
                  이자율은 {MIN_DEPOSIT_RATE}% ~ {MAX_DEPOSIT_RATE}% 사이로
                  입력하세요.
                </p>
              )}
              {validMinRate && validMaxRate && !validRateOrder && (
                <p className="text-lg text-red">
                  최소 이자율이 최대 이자율보다 클 수 없어요.
                </p>
              )}
            </div>
          )}
          <div className="flex items-center gap-2 mt-3 ">
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
              inputClassName="text-[28px] font-bold text-primary w-24"
              inputMode="decimal"
              invalid={showRateError}
            />

            <span className="px-2 text-gray-500 text-[20px] flex items-center justify-center">
              <PiTilde />
            </span>

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
              inputClassName="text-[28px] font-bold text-primary w-24"
              inputMode="decimal"
              invalid={showRateError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

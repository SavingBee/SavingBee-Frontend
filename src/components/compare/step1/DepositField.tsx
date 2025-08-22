import { useEffect, useState } from "react";
import EditableValue from "./EditableValue";
import type { DepositFilter } from "./PlanFilter";

interface DepositFieldProps {
  onChange?: (f: DepositFilter, valid: boolean) => void;
}

export function DepositField({ onChange }: DepositFieldProps) {
  const [principal, setPrincipal] = useState<number | "">("");
  const [rate, setRate] = useState<number | "">("");

  const [touched, setTouched] = useState({ principal: false, rate: false });

  const validPrincipal =
    typeof principal === "number" &&
    principal > 0 &&
    principal <= 1_000_000_000;
  const validRate = typeof rate === "number" && rate > 0 && rate <= 20;

  const valid = validPrincipal && validRate;

  useEffect(() => {
    onChange?.(
      {
        principal: typeof principal === "number" ? principal : undefined,
        rate: typeof rate === "number" ? rate : undefined,
      },
      valid,
    );
  }, [principal, rate, valid, onChange]);

  return (
    <div className="w-full rounded-md border border-graye5 bg-grayf9">
      <div className="grid grid-cols-2 divide-x divide-graye5">
        <div className="p-6">
          <div className="text-base text-gray6">예금액</div>
          <div
            className={`mt-3 ${touched.principal && !validPrincipal ? "border-b-2 border-red-400" : ""}`}
          >
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
              inputClassName="text-[28px] font-bold text-primary w-48 text-right"
              inputMode="numeric"
            />
          </div>
          {touched.principal && !validPrincipal && (
            <p className="mt-1 text-xs text-red-500">
              1원 이상 10억 이하로 입력하세요.
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
      </div>
    </div>
  );
}

import { useEffect, useState, type ChangeEvent } from "react";
import Button from "../common/button/Button";
import FilterButton from "../search/FilterButton";
import FilterDropdown from "../search/FilterDropdown";
import MultiOption from "../search/dropdown/MultiOption";
import AmountForm from "../search/dropdown/AmountForm";
import RangeForm from "../search/dropdown/RangeForm";
import { OPTION_MAP, FILTERS_SAVINGS } from "./savingsConfig";
import { type SavingsFilter } from "@/types/search";

const TERMS = [6, 12, 24, 36];
// 컴포넌트 파일 상단 근처
const toArray = (v: unknown): (string | number)[] =>
  Array.isArray(v)
    ? (v as (string | number)[])
    : v != null
      ? [v as string | number]
      : [];

//타입 유추용
type FilterCategory =
  | "bankType"
  | "benefit"
  | "target"
  | "term"
  | "interestType"
  | "rsrvType"
  | "monthlyAmount"
  | "baseRate"
  | "maxRate"
  | "sort";

const parseNum = (e: ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value;
  if (raw === "") return undefined;
  const n = Number(String(raw).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

type Props = {
  value: SavingsFilter;
  onChange: (next: Partial<SavingsFilter>) => void; // 부모 상태만 수정
  onApply: () => void; // 조회하기(실제 fetch)
  onReset: () => void; // 초기화
};
export default function SavingsFilterBar({
  value,
  onChange,
  onApply,
  onReset,
}: Props) {
  const [open, setOpen] = useState<FilterCategory | undefined>();

  // 드롭다운 편집용 임시 상태
  const [draftAmount, setDraftAmount] = useState<number | undefined>();
  const [draftRange, setDraftRange] = useState<{ min?: number; max?: number }>(
    {},
  );

  useEffect(() => {
    if (!open) return;
    // 열릴 때 부모 상태를 draft로 복사
    if (open === "monthlyAmount") {
      setDraftAmount(value.monthlyAmountMax);
    }
    if (open === "baseRate") {
      setDraftRange({ min: value.baseRateMin, max: value.baseRateMax });
    }
    if (open === "maxRate") {
      setDraftRange({ min: value.maxRateMin, max: value.maxRateMax });
    }
  }, [open]);

  const commit = (patch: Partial<SavingsFilter>) => {
    onChange({ ...patch, page: 1 });
    setOpen(undefined);
  };

  const handleListChange = (id: FilterCategory, vals: any[]) => {
    // multi → 배열 그대로, single → 첫 값만
    if (id === "interestType" || id === "rsrvType" || id === "sort") {
      commit({ [id]: vals?.[0] ?? undefined } as any);
    } else {
      commit({ [id]: vals } as any);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 flex-wrap">
        {FILTERS_SAVINGS.map((f) => {
          const isActive = open === (f.id as FilterCategory);
          return (
            <div key={f.id} className="relative inline-block">
              <FilterButton
                filterText={f.filterLabel}
                isActive={isActive}
                clickFilter={() =>
                  setOpen(isActive ? undefined : (f.id as FilterCategory))
                }
              />

              {isActive && (
                <FilterDropdown
                  onClose={() => setOpen(undefined)}
                  variant={
                    f.kind === "range" || f.kind === "amount"
                      ? "input"
                      : "checkbox"
                  }
                >
                  <div
                    className={
                      f.kind === "multi" || f.kind === "single"
                        ? "w-[360px]"
                        : "w-auto"
                    }
                  >
                    {/* 리스트/단일 선택 */}
                    {(f.kind === "multi" || f.kind === "single") && (
                      <MultiOption
                        options={
                          OPTION_MAP[
                            f.optionCategory as keyof typeof OPTION_MAP
                          ] ??
                          ([] as { label: string; value: string | number }[])
                        }
                        values={
                          f.kind === "single"
                            ? (value as any)[f.id]
                              ? [(value as any)[f.id]]
                              : []
                            : ((value as any)[f.id] ?? [])
                        }
                        // MultiOption이 multiple prop 없다면 values 길이 0/1로 단일 선택 처리
                        onChange={(vals) =>
                          handleListChange(f.id as FilterCategory, vals)
                        }
                      />
                    )}

                    {/* 금액 */}
                    {f.kind === "amount" && f.id === "monthlyAmount" && (
                      <AmountForm
                        aFilter={{
                          id: "monthlyAmount",
                          filterLabel: f.filterLabel,
                          kind: "amount",
                          unit: "원",
                          step: 10_000,
                        }}
                        value={draftAmount}
                        onChange={(e) => setDraftAmount(parseNum(e))}
                        onApply={() =>
                          commit({ monthlyAmountMax: draftAmount })
                        }
                      />
                    )}

                    {/* 범위 */}
                    {f.kind === "range" && f.id === "baseRate" && (
                      <RangeForm
                        minValue={draftRange.min}
                        maxValue={draftRange.max}
                        onChangeMin={(e) =>
                          setDraftRange((s) => ({ ...s, min: parseNum(e) }))
                        }
                        onChangeMax={(e) =>
                          setDraftRange((s) => ({ ...s, max: parseNum(e) }))
                        }
                        onApply={() =>
                          commit({
                            baseRateMin: draftRange.min,
                            baseRateMax: draftRange.max,
                          })
                        }
                      />
                    )}

                    {f.kind === "range" && f.id === "maxRate" && (
                      <RangeForm
                        minValue={draftRange.min}
                        maxValue={draftRange.max}
                        onChangeMin={(e) =>
                          setDraftRange((s) => ({ ...s, min: parseNum(e) }))
                        }
                        onChangeMax={(e) =>
                          setDraftRange((s) => ({ ...s, max: parseNum(e) }))
                        }
                        onApply={() =>
                          commit({
                            maxRateMin: draftRange.min,
                            maxRateMax: draftRange.max,
                          })
                        }
                      />
                    )}
                  </div>
                </FilterDropdown>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="sm"
          className="bg-black6 text-white"
          onClick={onReset}
        >
          필터 초기화
        </Button>
        {/* <Button
          type="button"
          variant="sm"
          className="bg-primary text-white"
          onClick={onApply}
        >
          조회하기
        </Button> */}
      </div>
    </div>
  );
}

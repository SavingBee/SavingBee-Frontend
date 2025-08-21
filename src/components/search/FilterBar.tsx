import { useState, type ChangeEvent } from "react";
import { MdRefresh } from "react-icons/md";
import Button from "../common/button/Button";
import FilterButton from "./FilterButton";
import FilterDropdown from "./FilterDropdown";
import MultiOption from "./dropdown/MultiOption";
import AmountForm from "./dropdown/AmountForm";
import RangeForm from "./dropdown/RangeForm";
import { FILTERS, OPTION_MAP } from "./dropdown/config";
import type {
  Filter,
  ListFilter,
  AmountFilter,
  ListCategory,
  FilterCategory,
  RangeFilter,
} from "@/types/searchFilter";
import { filterButtonStyle } from "./FilterButton";

const isList = (f?: Filter): f is ListFilter =>
  !!f && (f.kind === "multi" || f.kind === "single");
const isAmount = (f?: Filter): f is AmountFilter => !!f && f.kind === "amount";
const isRange = (f?: Filter): f is RangeFilter => !!f && f.kind === "range";

//selected는 리스트카테고리만 관리, 넘버카테고리는 별로 state 관리
type Selected = Record<ListCategory, string[]>;
type RangeState = { min?: number; max?: number };

type Props = {
  selected: Selected;
  setSelected: React.Dispatch<React.SetStateAction<Selected>>;
  amount?: number;
  setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  baseRate: RangeState;
  setBaseRate: React.Dispatch<React.SetStateAction<RangeState>>;
  maxRate: RangeState;
  setMaxRate: React.Dispatch<React.SetStateAction<RangeState>>;

  // 추가
  monthlyAmount?: number;
  setMonthlyAmount: React.Dispatch<React.SetStateAction<number | undefined>>;

  totalAmount: RangeState;
  setTotalAmount: React.Dispatch<React.SetStateAction<RangeState>>;
};

const parseNum = (e: ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value;
  const n = Number(String(raw).replace(/[^\d.-]/g, ""));
  return raw === "" ? undefined : Number.isFinite(n) ? n : undefined;
};

export default function FilterBar({
  selected,
  setSelected,
  amount,
  setAmount,
  baseRate,
  setBaseRate,
  maxRate,
  setMaxRate,
  monthlyAmount,
  setMonthlyAmount,
  totalAmount,
  setTotalAmount,
}: Props) {
  const [openOption, setOpenOption] = useState<FilterCategory | undefined>();

  const [draftAmount, setDraftAmount] = useState<number | undefined>(amount);
  const [draftBase, setDraftBase] = useState<RangeState>(baseRate);
  const [draftMax, setDraftMax] = useState<RangeState>(maxRate);
  // const [interestType, setInterestType] = useState<string[]>([]);
  // const [rsrvType, setRsrvType] = useState<string[]>([]);
  const [draftMonthly, setDraftMonthly] = useState<number | undefined>(
    monthlyAmount,
  );
  const [draftTotal, setDraftTotal] = useState<RangeState>(totalAmount ?? {});
  const [alignRight, setAlignRight] = useState<Record<string, boolean>>({});

  const handleFilter = (
    id: FilterCategory,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownWidth = 360; // 드롭다운 예상 폭
    const gutter = 16; // 오른쪽 여백
    const willOverflowRight =
      rect.left + dropdownWidth > window.innerWidth - gutter;

    setOpenOption((prev) => {
      const next = prev === id ? undefined : id;
      if (next) {
        setDraftAmount(amount);
        setDraftBase(baseRate);
        setDraftMax(maxRate);
      }
      return next;
    });

    setAlignRight((prev) => ({ ...prev, [id]: willOverflowRight }));
  };

  const resetAll = () => {
    setSelected({
      bankType: [],
      benefit: [],
      target: [],
      term: [],
      interestType: [],
      rsrvType: [],
      // monthlyAmount: [],
      // totalAmount: [],
    });
    setAmount(undefined);
    setBaseRate({});
    setMaxRate({});
    setMonthlyAmount(undefined);
    setTotalAmount({});
    setOpenOption(undefined);
  };

  //숫자 입력 핸들러
  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDraftAmount(parseNum(e));
  const onBaseMinChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDraftBase((s) => ({ ...s, min: parseNum(e) }));
  const onBaseMaxChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDraftBase((s) => ({ ...s, max: parseNum(e) }));
  const onMaxMinChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDraftMax((s) => ({ ...s, min: parseNum(e) }));
  const onMaxMaxChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDraftMax((s) => ({ ...s, max: parseNum(e) }));

  //적용함수
  const applyAmount = () => {
    setAmount(draftAmount);
    setOpenOption(undefined);
  };
  const applyBase = () => {
    setBaseRate(draftBase);
    setOpenOption(undefined);
  };
  const applyMax = () => {
    setMaxRate(draftMax);
    setOpenOption(undefined);
  };
  const applyMonthly = () => {
    setMonthlyAmount(draftMonthly);
    setSelected((prev) => ({
      ...prev,
      monthlyAmount: draftMonthly != null ? [String(draftMonthly)] : [], // ["300000"] 형태
    }));
    setOpenOption(undefined);
  };

  // 총저축금: 부모 상태 + selected 반영 ("min-max" 문자열)
  const applyTotal = () => {
    setTotalAmount(draftTotal);
    const min = draftTotal.min != null ? String(draftTotal.min) : "";
    const max = draftTotal.max != null ? String(draftTotal.max) : "";
    const joined = `${min}-${max}`; // ""-"" 일 때는 빈 배열로
    setSelected((prev) => ({
      ...prev,
      totalAmount: min || max ? [joined] : [],
    }));
    setOpenOption(undefined);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row justify-between">
      {/* FilterButton ---- 컨테이너*/}
      <div className=" flex  flex-wrap items-center gap-2">
        {FILTERS.map((filter) => {
          const isActive = openOption === filter.id;

          return (
            // <div key={filter.id} className="relative inline-block">
            <div key={filter.id} className="relative">
              <FilterButton
                filterText={filter.filterLabel}
                isActive={isActive}
                clickFilter={(e) => handleFilter(filter.id, e)}
              />

              {isActive && (
                //드롭다운을 레이아웃에서 분리 -> 가로 스크롤 차단
                <div
                  className={[
                    // 모바일: 가로 중심 정렬

                    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[70vh] rounded-xl p-4 shadow-lg z-50",
                    // sm 이상: 기존 팝업 방식
                    "sm:absolute sm:top-full sm:left-0 sm:translate-x-0 sm:translate-y-0 sm:w-auto sm:max-h-none sm:mt-2",
                    alignRight[filter.id] ? "sm:right-0" : "sm:left-0", // ← 여기 핵심!

                    // 크기 제한
                    "sm:w-[360px] sm:max-w-[min(360px,calc(100vw-32px))]",

                    // 공통 스타일
                    "rounded-xl  bg-white sm:shadow-lg",
                  ].join(" ")}
                >
                  <FilterDropdown
                    onClose={() => setOpenOption(undefined)}
                    variant={isList(filter) ? "checkbox" : "input"}
                  >
                    {/* <div className={isList(filter) ? "w-[360px]" : "w-auto"}> */}
                    <div
                      className={
                        isList(filter)
                          ? "w-full sm:w-[360px]"
                          : "w-full sm:w-auto"
                      }
                    >
                      {isList(filter) && (
                        <MultiOption
                          options={OPTION_MAP[filter.optionCategory]!}
                          values={selected[filter.id as ListCategory] ?? []}
                          onChange={(vals) =>
                            setSelected((prev) => ({
                              ...prev,
                              [filter.id as ListCategory]: vals,
                            }))
                          }
                        />
                      )}
                      {isAmount(filter) && filter.id === "amount" && (
                        <AmountForm
                          aFilter={filter}
                          value={draftAmount}
                          onChange={(e) => setDraftAmount(parseNum(e))}
                          onApply={() => {
                            setAmount(draftAmount);
                            setOpenOption(undefined);
                          }}
                        />
                      )}
                      {isAmount(filter) && filter.id === "monthlyAmount" && (
                        <AmountForm
                          aFilter={filter}
                          value={draftMonthly}
                          onChange={(e) => setDraftMonthly(parseNum(e))}
                          onApply={() => {
                            setMonthlyAmount(draftMonthly);
                            setOpenOption(undefined);
                          }}
                        />
                      )}
                      {isRange(filter) && filter.id === "baseRate" && (
                        <RangeForm
                          minValue={draftBase.min}
                          maxValue={draftBase.max}
                          onChangeMin={onBaseMinChange}
                          onChangeMax={onBaseMaxChange}
                          onApply={applyBase}
                        />
                      )}
                      {isRange(filter) && filter.id === "maxRate" && (
                        <RangeForm
                          minValue={draftMax.min}
                          maxValue={draftMax.max}
                          onChangeMin={onMaxMinChange}
                          onChangeMax={onMaxMaxChange}
                          onApply={applyMax}
                        />
                      )}

                      {/* 총저축금 */}
                      {isRange(filter) && filter.id === "totalAmount" && (
                        <RangeForm
                          minValue={totalAmount.min}
                          maxValue={totalAmount.max}
                          onChangeMin={(e) =>
                            setTotalAmount((s) => ({ ...s, min: parseNum(e) }))
                          }
                          onChangeMax={(e) =>
                            setTotalAmount((s) => ({ ...s, max: parseNum(e) }))
                          }
                          onApply={() => setOpenOption(undefined)}
                        />
                      )}
                    </div>
                  </FilterDropdown>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 필터 초기화----> 이동하기 */}
      <Button
        type="button"
        styleVariant="bg"
        variant="sm"
        className={`${filterButtonStyle} !bg-black6 !text-white !w-auto `}
        onClick={resetAll}
      >
        <span className="flex gap-1">
          <MdRefresh />
          필터 초기화
        </span>
      </Button>
    </div>
  );
}

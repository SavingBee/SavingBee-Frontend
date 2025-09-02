import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";

import { MdRefresh } from "react-icons/md";
import Button from "../common/button/Button";
import FilterButton, { filterButtonStyle } from "./FilterButton";

import MultiOption from "@/components/filter/dropdown/MultiOption";
import AmountForm from "@/components/filter/dropdown/AmountForm";
import RangeForm from "@/components/filter/dropdown/RangeForm";
import Popover from "@/components/common/overlay/Popover";
import BottomSheet from "@/components/common/overlay/BottomSheet";
import { OPTION_MAP } from "@/components/filter/dropdown/config";
import type {
  Selected,
  Filter,
  ListFilter,
  AmountFilter,
  ListCategory,
  FilterCategory,
  RangeFilter,
} from "@/types/uiFilter";

//list, amount, range 필터
const isList = (f?: Filter): f is ListFilter =>
  !!f && (f.kind === "multi" || f.kind === "single");
const isAmount = (f?: Filter): f is AmountFilter => !!f && f.kind === "amount";
const isRange = (f?: Filter): f is RangeFilter => !!f && f.kind === "range";

// type Selected = Record<ListCategory, string[]>;
type RangeState = { min?: number; max?: number };

const EMPTY_RANGE: RangeState = { min: undefined, max: undefined };

type Props = {
  //page 타입별 Filter 변경
  filters: readonly Filter[];
  state: {
    selected: Selected;
    amount?: number;
    monthlyAmount?: number;
    baseRate?: RangeState;
    maxRate?: RangeState;
    totalAmount?: RangeState;
  };
  actions: {
    setSelected: React.Dispatch<React.SetStateAction<Selected>>;
    setAmount?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setMonthlyAmount?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setBaseRate?: React.Dispatch<React.SetStateAction<RangeState>>;
    setMaxRate?: React.Dispatch<React.SetStateAction<RangeState>>;
    setTotalAmount?: React.Dispatch<React.SetStateAction<RangeState>>;
  };

  //최종 queryParam 넘기기 위한 타입정의 부분
  onConfirm?: (nf: {
    lists: Record<ListCategory, string[]>;
    amount?: number;
    monthlyAmount?: number;
    baseRateMin?: number;
    baseRateMax?: number;
    maxRateMin?: number;
    maxRateMax?: number;
    totalAmountMin?: number;
    totalAmountMax?: number;
  }) => void;
};

//임시저장
type DraftState = {
  amount?: number;
  baseRate?: RangeState;
  maxRate?: RangeState;
  monthlyAmount?: number;
  totalAmount?: RangeState;
  lists?: Partial<Record<ListCategory, string[]>>;
};

const parseNum = (e: ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value;
  const n = Number(String(raw).replace(/[^\d.-]/g, ""));
  return raw === "" ? undefined : Number.isFinite(n) ? n : undefined;
};

const isDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= 640;

// 버튼 클릭 → 열기/닫기 + align 결정(마지막 열이면 end)

function decideAlignByOverflow(
  anchorEl: HTMLElement,
  containerEl: HTMLElement,
  preferredWidth = 360,
  gutter = 16,
): "start" | "end" {
  const a = anchorEl.getBoundingClientRect();
  const c = containerEl.getBoundingClientRect();
  const containerRight = c.right - gutter;
  // 버튼 왼쪽에서 시작해 선호 폭만큼 열었을 때 컨테이너 오른쪽을 넘치면 end 정렬
  return a.left + preferredWidth > containerRight ? "end" : "start";
}

export default function FilterBar({
  filters,
  state,
  actions,
  onConfirm,
}: Props) {
  const { selected, amount, monthlyAmount, baseRate, maxRate, totalAmount } =
    state;
  const {
    setSelected,
    setAmount,
    setMonthlyAmount,
    setBaseRate,
    setMaxRate,
    setTotalAmount,
  } = actions;

  // 열림 상태
  const [openId, setOpenId] = useState<FilterCategory | null>(null);
  const [align, setAlign] = useState<"start" | "end">("start");
  const [desktop, setDesktop] = useState(isDesktop());

  // 필터버튼 ref
  const rowRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // 드래프트 상태 하나로 묶기
  const [draft, setDraft] = useState<DraftState>({
    amount,
    baseRate,
    maxRate,
    monthlyAmount,
    totalAmount,
    lists: {},
  });

  // 브레이크포인트 감지
  useEffect(() => {
    function onResize() {
      setDesktop(isDesktop());
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onToggle =
    (id: FilterCategory) => (e: React.MouseEvent<HTMLButtonElement>) => {
      if (openId === id) {
        setOpenId(null);
        return;
      }
      const anchor = e.currentTarget as HTMLButtonElement;

      const a = decideAlignByOverflow(anchor, rowRef.current!, 360, 16); // 360은 Popover 선호 폭과 동일
      setAlign(a);
      const currentListVals = selected[id as ListCategory] ?? [];

      setAnchorEl(anchor);
      setDraft({
        amount,
        baseRate,
        maxRate,
        monthlyAmount,
        totalAmount,
        //리스트 필터 open -> 현재 선택을 draft.lists로 복사 (임시 대기 상태)
        lists: { ...draft.lists, [id as ListCategory]: currentListVals },
      });
      setOpenId(id);
    };

  /**
   *
   * draft 상태 -> 최종 확정 상태
   * 부모상태에 전달
   * 팝업 닫기
   */
  const applyById = (id: FilterCategory) => {
    const f = filters.find((x) => x.id === id);
    if (!f) return;

    //  'next 스냅샷'
    let nextLists: Selected = { ...selected };
    let nextAmount = amount;
    let nextMonthly = monthlyAmount;
    let nextBase: RangeState = { ...baseRate };
    let nextMax: RangeState = { ...maxRate };
    let nextTotal: RangeState = { ...totalAmount };

    //바뀐 필드만 draft로 덮어씀 -------  실제 확정 state 커밋
    if (isList(f)) {
      const lid = id as ListCategory;
      const vals = (draft.lists?.[lid] ?? []) as string[];
      nextLists = { ...selected, [lid]: vals };
      setSelected(nextLists);
    } else {
      if (id === "amount") {
        nextAmount = draft.amount ?? undefined;
        setAmount?.(nextAmount);
      }
      if (id === "monthlyAmount") {
        nextMonthly = draft.monthlyAmount ?? undefined;
        setMonthlyAmount?.(nextMonthly);
      }
      if (id === "baseRate") {
        nextBase = { ...(draft.baseRate ?? EMPTY_RANGE) };
        setBaseRate?.(nextBase);
      }
      if (id === "maxRate") {
        nextMax = { ...(draft.maxRate ?? EMPTY_RANGE) };
        setMaxRate?.(nextMax);
      }
      if (id === "totalAmount") {
        nextTotal = { ...(draft.totalAmount ?? EMPTY_RANGE) };
        setTotalAmount?.(nextTotal);
      }
    }

    // 확정 스냅샷 상위 전달(쿼리 준비)
    onConfirm?.({
      lists: nextLists,
      amount: nextAmount,
      monthlyAmount: nextMonthly,
      baseRateMin: nextBase.min,
      baseRateMax: nextBase.max,
      maxRateMin: nextMax.min,
      maxRateMax: nextMax.max,
      totalAmountMin: nextTotal.min,
      totalAmountMax: nextTotal.max,
    });

    // 팝업 닫기
    setOpenId(null);
  };

  //하나만 초기화 할 경우 -> 해당 필터의 draft만 기본 값, 팝업은 여전히 Open 상태
  const resetOne = (id: FilterCategory) => {
    const f = filters.find((x) => x.id === id);
    if (!f) return;
    if (isList(f)) {
      const lid = id as ListCategory;
      setDraft((d) => ({ ...d, lists: { ...d.lists, [lid]: [] } }));
    } else if (id === "amount") setDraft((d) => ({ ...d, amount: undefined }));
    else if (id === "monthlyAmount")
      setDraft((d) => ({ ...d, monthlyAmount: undefined }));
    else if (id === "baseRate")
      setDraft((d) => ({ ...d, baseRate: EMPTY_RANGE }));
    else if (id === "maxRate")
      setDraft((d) => ({ ...d, maxRate: EMPTY_RANGE }));
    else if (id === "totalAmount")
      setDraft((d) => ({ ...d, totalAmount: EMPTY_RANGE }));
  };

  const resetAll = () => {
    const emptyLists = {
      bankType: [],
      benefit: [],
      target: [],
      term: [],
      interestType: [],
      // rsrvType: [],
    };

    setSelected(emptyLists);
    setAmount?.(undefined);
    setMonthlyAmount?.(undefined);
    setBaseRate?.(EMPTY_RANGE);
    setMaxRate?.(EMPTY_RANGE);
    setTotalAmount?.(EMPTY_RANGE);

    setDraft({
      amount: undefined,
      monthlyAmount: undefined,
      baseRate: EMPTY_RANGE,
      maxRate: EMPTY_RANGE,
      totalAmount: EMPTY_RANGE,
      lists: {}, // 팝업 열 때 현재 selected로 다시 살림
    });

    // reset 직후 상위에 알림 -------  SavingsPage가 URL 갱신 ----- 리스트 재요청
    onConfirm?.({
      lists: emptyLists,
      amount: undefined,
      monthlyAmount: undefined,
      baseRateMin: undefined,
      baseRateMax: undefined,
      maxRateMin: undefined,
      maxRateMax: undefined,
      totalAmountMin: undefined,
      totalAmountMax: undefined,
    });

    setOpenId(null);
  };

  // 현재 열린 필터 객체/라벨
  const currentFilter = useMemo(
    () => filters.find((f) => f.id === openId),
    [openId],
  );
  const currentLabel = currentFilter?.filterLabel ?? "";

  /**
   *
   * 콘텐츠 타입별로 렌더
   * MultiOption , AmountForm, RangeForm
   *
   */
  function renderContent(f?: Filter) {
    if (!f) return null;
    if (isList(f)) {
      const lid = f.id as ListCategory;
      const vals = (draft.lists?.[lid] ?? []) as string[];
      return (
        <MultiOption
          options={OPTION_MAP[f.optionCategory]!}
          values={vals}
          onChange={(next) =>
            setDraft((d) => ({ ...d, lists: { ...d.lists, [lid]: next } }))
          }
        />
      );
    }
    if (isAmount(f) && f.id === "amount") {
      return (
        <AmountForm
          aFilter={f}
          value={draft.amount}
          onChange={(e) => setDraft((d) => ({ ...d, amount: parseNum(e) }))}
          // onApply={() => applyById("amount")}
        />
      );
    }
    if (isAmount(f) && f.id === "monthlyAmount") {
      return (
        <AmountForm
          aFilter={f}
          value={draft.monthlyAmount}
          onChange={(e) =>
            setDraft((d) => ({ ...d, monthlyAmount: parseNum(e) }))
          }
          // onApply={() => applyById("monthlyAmount")}
        />
      );
    }
    if (isRange(f) && f.id === "baseRate") {
      return (
        <RangeForm
          minValue={draft.baseRate?.min}
          maxValue={draft.baseRate?.max}
          onChangeMin={(e) =>
            setDraft((d) => ({
              ...d,
              baseRate: { ...d.baseRate, min: parseNum(e) },
            }))
          }
          onChangeMax={(e) =>
            setDraft((d) => ({
              ...d,
              baseRate: { ...d.baseRate, max: parseNum(e) },
            }))
          }
          // onApply={() => applyById("baseRate")}
        />
      );
    }
    if (isRange(f) && f.id === "maxRate") {
      return (
        <RangeForm
          minValue={draft.maxRate?.min}
          maxValue={draft.maxRate?.max}
          onChangeMin={(e) =>
            setDraft((d) => ({
              ...d,
              maxRate: { ...d.maxRate, min: parseNum(e) },
            }))
          }
          onChangeMax={(e) =>
            setDraft((d) => ({
              ...d,
              maxRate: { ...d.maxRate, max: parseNum(e) },
            }))
          }
          // onApply={() => applyById("maxRate")}
        />
      );
    }
    if (isRange(f) && f.id === "totalAmount") {
      return (
        <RangeForm
          minValue={draft.totalAmount?.min}
          maxValue={draft.totalAmount?.max}
          onChangeMin={(e) =>
            setDraft((d) => ({
              ...d,
              totalAmount: { ...d.totalAmount, min: parseNum(e) },
            }))
          }
          onChangeMax={(e) =>
            setDraft((d) => ({
              ...d,
              totalAmount: { ...d.totalAmount, max: parseNum(e) },
            }))
          }
          // onApply={() => applyById("totalAmount")}
        />
      );
    }
    return null;
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start mb-6">
      {/* 버튼그리드 -> 플렉스 변경*/}
      <div
        ref={rowRef}
        className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0"
      >
        {filters.map((f) => {
          const isActive = openId === f.id;
          return (
            <div key={f.id} className="relative">
              <FilterButton
                filterText={f.filterLabel}
                isActive={isActive}
                clickFilter={onToggle(f.id as FilterCategory)}
              />
            </div>
          );
        })}
      </div>
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

      {/* PC Popover: 버튼 바로 아래, 마지막 열이면 end 정렬 */}
      <Popover
        open={!!openId && !!anchorEl}
        anchorEl={anchorEl}
        align={align}
        onClose={() => setOpenId(null)}
        preferredWidth={360}
      >
        <div className="w-[min(360px)]">
          {renderContent(currentFilter)}
          {/* 하단 푸터  */}
          {currentFilter && (
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-3 py-1 rounded-lg border border-black3/20"
                onClick={() =>
                  currentFilter && resetOne(currentFilter.id as FilterCategory)
                }
              >
                초기화
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-primary text-white"
                onClick={() =>
                  currentFilter && applyById(currentFilter.id as FilterCategory)
                }
              >
                확인
              </button>
            </div>
          )}
        </div>
      </Popover>

      {/* Mobile Bottom Sheet: 하단 푸터 고정, 확인/초기화 버튼 */}
      <BottomSheet
        open={!desktop && !!openId}
        title={currentLabel}
        onClose={() => setOpenId(null)}
        onReset={() =>
          currentFilter && resetOne(currentFilter.id as FilterCategory)
        }
        onApply={() =>
          currentFilter && applyById(currentFilter.id as FilterCategory)
        }
      >
        <div className="w-full">{renderContent(currentFilter)}</div>
      </BottomSheet>
    </div>
  );
}

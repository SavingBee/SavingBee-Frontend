import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";

import { MdRefresh } from "react-icons/md";
import Button from "../common/button/Button";
import FilterButton from "./FilterButton";
import { filterButtonStyle } from "./FilterButton";
import MultiOption from "../search/dropdown/MultiOption";
import AmountForm from "../search/dropdown/AmountForm";
import RangeForm from "../search/dropdown/RangeForm";
import Popover from "../common/overlay/Popover";
import BottomSheet from "../common/overlay/BottomSheet";
import { FILTERS, OPTION_MAP } from "../search/dropdown/config";
import type {
  Filter,
  ListFilter,
  AmountFilter,
  ListCategory,
  FilterCategory,
  RangeFilter,
} from "@/types/searchFilter";

const isList = (f?: Filter): f is ListFilter =>
  !!f && (f.kind === "multi" || f.kind === "single");
const isAmount = (f?: Filter): f is AmountFilter => !!f && f.kind === "amount";
const isRange = (f?: Filter): f is RangeFilter => !!f && f.kind === "range";

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

type DraftState = {
  amount?: number;
  baseRate: RangeState;
  maxRate: RangeState;
  monthlyAmount?: number;
  totalAmount: RangeState;
  lists: Partial<Record<ListCategory, string[]>>; //체크박스 -- 임시 저장
};
const isDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= 640;

export default function FilterBar_hk(props: Props) {
  const {
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
  } = props;

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

  // 적용/초기화 로직 (확인/초기화 버튼에서 사용)
  const applyById = (id: FilterCategory) => {
    const f = FILTERS.find((x) => x.id === id);
    if (!f) return;

    if (isList(f)) {
      const lid = id as ListCategory;
      const vals = draft.lists[lid] ?? [];
      setSelected((prev) => ({ ...prev, [lid]: vals })); // 리스트만 selected에 커밋
    } else {
      if (id === "amount") setAmount(draft.amount);
      if (id === "monthlyAmount") setMonthlyAmount(draft.monthlyAmount);
      if (id === "baseRate") setBaseRate(draft.baseRate);
      if (id === "maxRate") setMaxRate(draft.maxRate);
      if (id === "totalAmount") setTotalAmount(draft.totalAmount);
    }

    setOpenId(null);
  };

  //하나만 초기화 할 경우 -> 해당 필터의 draft만 기본 값, 팝업은 여전히 Open 상태
  const resetOne = (id: FilterCategory) => {
    const f = FILTERS.find((x) => x.id === id);
    if (!f) return;
    if (isList(f)) {
      const lid = id as ListCategory;
      setDraft((d) => ({ ...d, lists: { ...d.lists, [lid]: [] } }));
    } else if (id === "amount") setDraft((d) => ({ ...d, amount: undefined }));
    else if (id === "monthlyAmount")
      setDraft((d) => ({ ...d, monthlyAmount: undefined }));
    else if (id === "baseRate") setDraft((d) => ({ ...d, baseRate: {} }));
    else if (id === "maxRate") setDraft((d) => ({ ...d, maxRate: {} }));
    else if (id === "totalAmount") setDraft((d) => ({ ...d, totalAmount: {} }));
  };

  const resetAll = () => {
    setSelected({
      bankType: [],
      benefit: [],
      target: [],
      term: [],
      interestType: [],
      rsrvType: [],
    } as Selected);
    setAmount(undefined);
    setBaseRate({});
    setMaxRate({});
    setMonthlyAmount(undefined);
    setTotalAmount({});
    setOpenId(null);
  };

  // 현재 열린 필터 객체/라벨
  const currentFilter = useMemo(
    () => FILTERS.find((f) => f.id === openId),
    [openId],
  );
  const currentLabel = currentFilter?.filterLabel ?? "";

  // 콘텐츠 렌더 (공용: PC/모바일 모두 동일 컴포넌트 사용)
  function renderContent(f?: Filter) {
    if (!f) return null;
    if (isList(f)) {
      const lid = f.id as ListCategory;
      const vals = draft.lists[lid] ?? [];
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
          minValue={draft.baseRate.min}
          maxValue={draft.baseRate.max}
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
          minValue={draft.maxRate.min}
          maxValue={draft.maxRate.max}
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
          minValue={draft.totalAmount.min}
          maxValue={draft.totalAmount.max}
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
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
      {/* 버튼그리드 -> 플렉스 변경*/}
      <div
        ref={rowRef}
        className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0"
      >
        {FILTERS.map((f) => {
          const isActive = openId === f.id;
          return (
            <div key={f.id} className="relative">
              <FilterButton
                filterText={f.filterLabel}
                isActive={isActive}
                clickFilter={onToggle(f.id)}
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
        <div className="w-[max(360px))]">
          {renderContent(currentFilter)}
          {/* 하단 푸터  */}
          {currentFilter && (
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-3 py-1 rounded-lg border border-black3/20"
                onClick={() => currentFilter && resetOne(currentFilter.id)}
              >
                초기화
              </button>
              <button
                className="px-3 py-1 rounded-lg bg-primary text-white"
                onClick={() => currentFilter && applyById(currentFilter.id)}
              >
                확인
              </button>
            </div>
          )}
        </div>
      </Popover>

      {/* Mobile Bottom Sheet: 하단 푸터 고정, 확인/초기화 버튼 필수 */}
      <BottomSheet
        open={!desktop && !!openId}
        title={currentLabel}
        onClose={() => setOpenId(null)}
        onReset={() => currentFilter && resetOne(currentFilter.id)}
        onApply={() => currentFilter && applyById(currentFilter.id)}
      >
        <div className="w-full">{renderContent(currentFilter)}</div>
      </BottomSheet>
    </div>
  );
}

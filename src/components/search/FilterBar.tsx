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
}: Props) {
  const [openOption, setOpenOption] = useState<FilterCategory | undefined>();

  const [draftAmount, setDraftAmount] = useState<number | undefined>(amount);
  const [draftBase, setDraftBase] = useState<RangeState>(baseRate);
  const [draftMax, setDraftMax] = useState<RangeState>(maxRate);

  const handleFilter = (id: FilterCategory) => {
    setOpenOption((prev) => {
      const next = prev === id ? undefined : id;
      if (next) {
        setDraftAmount(amount);
        setDraftBase(baseRate);
        setDraftMax(maxRate);
      }
      return next;
    });
  };

  const resetAll = () => {
    setSelected({ bankType: [], benefit: [], target: [], term: [] });
    setAmount(undefined);
    setBaseRate({});
    setMaxRate({});
    setOpenOption(undefined);
    setDraftAmount(undefined);
    setDraftBase({});
    setDraftMax({});
  };

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

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {FILTERS.map((filter) => {
          const isActive = openOption === filter.id;

          return (
            <div key={filter.id} className="relative inline-block">
              <FilterButton
                filterText={filter.filterLabel}
                isActive={isActive}
                clickFilter={() => handleFilter(filter.id)}
              />

              {isActive && (
                <FilterDropdown
                  onClose={() => setOpenOption(undefined)}
                  variant={isList(filter) ? "checkbox" : "input"}
                >
                  <div className={isList(filter) ? "w-[360px]" : "w-auto"}>
                    {isList(filter) && (
                      <MultiOption
                        options={OPTION_MAP[filter.optionCategory]}
                        values={selected[filter.id as ListCategory]}
                        onChange={(vals) =>
                          setSelected((prev) => ({
                            ...prev,
                            [filter.id as ListCategory]: vals,
                          }))
                        }
                      />
                    )}

                    {isAmount(filter) && (
                      <AmountForm
                        aFilter={filter}
                        value={draftAmount}
                        onChange={onAmountChange}
                        onApply={applyAmount}
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
                  </div>
                </FilterDropdown>
              )}
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        styleVariant="bg"
        variant="sm"
        className="bg-black6"
        onClick={resetAll}
      >
        <span className="flex gap-1">
          <MdRefresh size={20} />
          필터 초기화
        </span>
      </Button>
    </div>
  );
}

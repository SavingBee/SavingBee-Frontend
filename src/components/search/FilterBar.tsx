import { useState } from "react";
import { MdRefresh } from "react-icons/md";
import Button from "../common/button/Button";
import FilterButton from "./FilterButton";
import FilterDropdown from "./FilterDropdown";
import MultiOption from "./dropdown/MultiOption";

import { FILTERS, OPTION_MAP } from "./dropdown/config";
import type {
  Filter,
  ListFilter,
  AmountFilter,
  //RangeFilter,
  ListCategory,
  FilterCategory,
} from "@/types/searchFilter";
import AmountForm from "./dropdown/AmountForm";
// import RangeForm from "./dropdown/RangeForm";

const isList = (f?: Filter): f is ListFilter =>
  !!f && (f.kind === "multi" || f.kind === "single");
const isAmount = (f?: Filter): f is AmountFilter => !!f && f.kind === "amount";
// const isRange = (f?: Filter): f is RangeFilter => !!f && f.kind === "range";

type Selected = Record<ListCategory, string[]>;
const emptySelected: Selected = {
  bankType: [],
  benefit: [],
  target: [],
  term: [],
};

export default function FilterBar() {
  const [openOption, setOpenOption] = useState<FilterCategory | undefined>(
    undefined,
  );
  const activeFilter = FILTERS.find((f) => f.id === openOption);

  const [selected, setSelected] = useState<Selected>(emptySelected);
  const [amount, setAmount] = useState<number | undefined>();
  //   const [baseRate, setBaseRate] = useState<{ min?: number; max?: number }>({});
  //   const [maxRate, setMaxRate] = useState<{ min?: number; max?: number }>({});

  const handleFilter = (filterId: FilterCategory) => {
    setOpenOption((prev) => (prev === filterId ? undefined : filterId));
  };

  const resetAll = () => {
    setSelected(emptySelected);
    setAmount(undefined);
    // setBaseRate({});
    // setMaxRate({});
    setOpenOption(undefined);
  };

  const onApply = () => {
    setOpenOption(undefined);
  };

  return (
    <div className="relative flex justify-between">
      <div>
        {FILTERS.map((filter) => (
          <FilterButton
            key={filter.id}
            filterText={filter.filterLabel}
            isActive={openOption === filter.id}
            clickFilter={() => handleFilter(filter.id)}
          />
        ))}
      </div>
      {/* {activeFilter && isAmount(activeFilter) && (
        <AmountForm
          aFilter={activeFilter}
          value={amount}
          onChange={setAmount}
          onApply={onApply}
        />
      )} */}
      {activeFilter && (
        <FilterDropdown>
          <div className="w-[360px]">
            {/* <div className="mb-3 font-medium">{activeFilter.filterLabel}</div> */}

            {isList(activeFilter) && openOption && (
              <MultiOption
                options={OPTION_MAP[activeFilter.optionCategory]}
                values={selected[openOption as ListCategory]}
                onChange={(vals) =>
                  setSelected((prev) => ({
                    ...prev,
                    [openOption as ListCategory]: vals,
                  }))
                }
              />
            )}

            {isAmount(activeFilter) && (
              <AmountForm
                aFilter={activeFilter}
                value={amount}
                onChange={setAmount}
                onApply={onApply}
              />
            )}

            {/* {isRange(activeFilter) && (
              <RangeForm
                def={activeFilter}
                min={(activeFilter.id === "baseRate" ? baseRate : maxRate).min}
                max={(activeFilter.id === "baseRate" ? baseRate : maxRate).max}
                onChangeMin={(v) =>
                  activeFilter.id === "baseRate"
                    ? setBaseRate((p) => ({ ...p, min: v }))
                    : setMaxRate((p) => ({ ...p, min: v }))
                }
                onChangeMax={(v) =>
                  activeFilter.id === "baseRate"
                    ? setBaseRate((p) => ({ ...p, max: v }))
                    : setMaxRate((p) => ({ ...p, max: v }))
                }
                onApply={onApply}
              />
            )} */}
          </div>
        </FilterDropdown>
      )}

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

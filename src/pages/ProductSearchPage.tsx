/**
 * 필터의 상태를 보관
 */
import { useState } from "react";
// import { MdRefresh } from "react-icons/md";
import Button from "@/components/common/button/Button";
import FilterBar from "@/components/search/FilterBar";
import FilterBar_hk from "@/components/filter/FilterBar_hk";
import SelectedFilter from "@/components/search/SelectedFilter";
import { FaSearch } from "react-icons/fa";
import { OPTION_MAP } from "@/components/search/dropdown/config";
import type { ListCategory } from "@/types/searchFilter";
// import { filterButtonStyle } from "@/components/search/FilterButton";

type Selected = Record<ListCategory, string[]>;
type RangeState = { min?: number; max?: number };
const emptySelected: Selected = {
  bankType: [],
  benefit: [],
  target: [],
  term: [],
  interestType: [],
  rsrvType: [],
};

export default function ProductSearchPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Selected>(emptySelected);

  //숫자,범위 상태 (리스트와 분리)
  const [amount, setAmount] = useState<number | undefined>();

  const [baseRate, setBaseRate] = useState<RangeState>({});
  const [maxRate, setMaxRate] = useState<RangeState>({});
  const [monthlyAmount, setMonthlyAmount] = useState<number | undefined>(
    undefined,
  );
  const [totalAmount, setTotalAmount] = useState<RangeState>({});

  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  //리스트 선택 배지
  (Object.keys(selected) as ListCategory[]).forEach((cat) => {
    selected[cat].forEach((id) => {
      const label = OPTION_MAP[cat].find((o) => o.id === id)?.text ?? id;
      chips.push({
        key: `${cat}:${id}`,
        label,
        onRemove: () =>
          setSelected((prev) => ({
            ...prev,
            [cat]: prev[cat].filter((v) => v !== id),
          })),
      });
    });
  });

  if (typeof amount === "number") {
    chips.push({
      key: "amount",
      label: `저축금: ${amount.toLocaleString()}원`,
      onRemove: () => setAmount(undefined),
    });
  }

  if (baseRate.min !== undefined || baseRate.max !== undefined) {
    const a = baseRate.min ?? "최저값";
    const b = baseRate.max ?? "최고값";
    chips.push({
      key: "baseRate",
      label: `기본금리: ${a} ~ ${b}`,
      onRemove: () => setBaseRate({}),
    });
  }
  if (maxRate.min !== undefined || maxRate.max !== undefined) {
    const a = maxRate.min ?? "최저값";
    const b = maxRate.max ?? "최고값";
    chips.push({
      key: "maxRate",
      label: `최고금리: ${a} ~ ${b}`,
      onRemove: () => setMaxRate({}),
    });
  }
  if (typeof monthlyAmount === "number") {
    chips.push({
      key: "monthlyAmount",
      label: `월저축금: ${monthlyAmount.toLocaleString()}원`,
      onRemove: () => setMonthlyAmount(undefined),
    });
  }

  if (totalAmount.min !== undefined || totalAmount.max !== undefined) {
    const a = totalAmount.min
      ? `${totalAmount.min.toLocaleString()}원`
      : "최저값";
    const b = totalAmount.max
      ? `${totalAmount.max.toLocaleString()}원`
      : "최고값";
    chips.push({
      key: "totalAmount",
      label: `총저축금: ${a} ~ ${b}`,
      onRemove: () => setTotalAmount({}),
    });
  }

  return (
    <div>
      <form className="flex border-2 border-primary rounded-md mb-4">
        <input
          className="w-full p-4 outline-none rounded-md"
          placeholder="검색어를 입력해주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          variant="sm"
          styleVariant="border"
          className="text-primary border-none my-3"
        >
          <FaSearch size={20} />
        </Button>
      </form>

      {/* <FilterBar
        selected={selected}
        setSelected={setSelected}
        amount={amount}
        setAmount={setAmount}
        baseRate={baseRate}
        setBaseRate={setBaseRate}
        maxRate={maxRate}
        setMaxRate={setMaxRate}
        //추가
        monthlyAmount={monthlyAmount}
        setMonthlyAmount={setMonthlyAmount}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
      /> */}

      <FilterBar_hk
        selected={selected}
        setSelected={setSelected}
        amount={amount}
        setAmount={setAmount}
        baseRate={baseRate}
        setBaseRate={setBaseRate}
        maxRate={maxRate}
        setMaxRate={setMaxRate}
        monthlyAmount={monthlyAmount}
        setMonthlyAmount={setMonthlyAmount}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
      />

      <div>
        <SelectedFilter chips={chips} />
      </div>
    </div>
  );
}

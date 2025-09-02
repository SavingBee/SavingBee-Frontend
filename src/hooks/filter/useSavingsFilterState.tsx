import { useState } from "react";
import type { Selected } from "@/types/uiFilter";
type RangeState = { min?: number; max?: number };

export function useSavingsFilterState() {
  // 리스트형
  const [selected, setSelected] = useState<Selected>({
    bankType: [],
    benefit: [],
    target: [],
    term: [],
    interestType: [],
    // rsrvType: [],
  });

  // 숫자/범위형
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [monthlyAmount, setMonthlyAmount] = useState<number | undefined>(
    undefined,
  );
  const [baseRate, setBaseRate] = useState<RangeState>({});
  const [maxRate, setMaxRate] = useState<RangeState>({});
  const [totalAmount, setTotalAmount] = useState<number | undefined>(undefined);

  return {
    selected,
    setSelected,
    amount,
    setAmount,
    monthlyAmount,
    setMonthlyAmount,
    baseRate,
    setBaseRate,
    maxRate,
    setMaxRate,
    totalAmount,
    setTotalAmount,
  };
}

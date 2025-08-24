import { useState } from "react";

type RangeState = { min?: number; max?: number };
type Selected = {
  bankType: string[];
  benefit: string[];
  target: string[];
  term: string[];
  interestType: string[];
  rsrvType: string[];
};

export function useSavingsFilterState() {
  // 리스트형
  const [selected, setSelected] = useState<Selected>({
    bankType: [],
    benefit: [],
    target: [],
    term: [],
    interestType: [],
    rsrvType: [],
  });

  // 숫자/범위형
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [monthlyAmount, setMonthlyAmount] = useState<number | undefined>(
    undefined,
  );
  const [baseRate, setBaseRate] = useState<RangeState>({});
  const [maxRate, setMaxRate] = useState<RangeState>({});
  const [totalAmount, setTotalAmount] = useState<RangeState>({});

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

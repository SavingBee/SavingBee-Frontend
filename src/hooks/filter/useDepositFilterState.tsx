import { useState } from "react";
import type { Selected } from "@/types/uiFilter";

type RangeState = { min?: number; max?: number };

export function useDepositFilterState() {
  const [selected, setSelected] = useState<Selected>({
    bankType: [] as string[],
    benefit: [] as string[],
    target: [] as string[],
    term: [] as string[],
    interestType: [] as string[],
  });

  // const [amount, setAmount] = useState<number | undefined>(undefined);
  const [baseRate, setBaseRate] = useState<RangeState>({});
  const [maxRate, setMaxRate] = useState<RangeState>({});
  const [totalAmount, setTotalAmount] = useState<RangeState>({});
  // //예금전용: 가입한도  -- 최소, 최대 추가필요
  // const [maxLimit, setMaxLimit] = useState<RangeState>({});

  // monthlyAmount, totalAmount 없음

  return {
    selected,
    setSelected,
    // amount,
    // setAmount,
    baseRate,
    setBaseRate,
    maxRate,
    setMaxRate,
    // maxLimit,
    // setMaxLimit,
    totalAmount,
    setTotalAmount,
  };
}

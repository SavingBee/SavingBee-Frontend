// 공통 필터 정의
import type { Filter } from "@/types/uiFilter";

export const COMMON_FILTERS: Filter[] = [
  {
    id: "interestType",
    filterLabel: "이자계산방식",
    kind: "single",
    optionCategory: "interestType",
  },
  {
    id: "baseRate",
    filterLabel: "기본 금리",
    kind: "range",
    minKey: "intrRateMin",
    maxKey: "intrRateMax",
    unit: "%",
    min: 0,
    max: 20,
    step: 0.01,
    placeholders: { min: "최저 값", max: "최고 값" },
    formatter: (v) => String(v),
    parser: (s) => Number(s),
  },
  {
    id: "maxRate",
    filterLabel: "최고 금리",
    kind: "range",
    minKey: "intrRate2Min",
    maxKey: "intrRate2Max",
    unit: "%",
    min: 0,
    max: 20,
    step: 0.01,
    placeholders: { min: "최저 값", max: "최고 값" },
    formatter: (v) => String(v),
    parser: (s) => Number(s),
  },
];

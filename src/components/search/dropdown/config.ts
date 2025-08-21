import { Filter, ListCategory, Option } from "@/types/searchFilter";

export const BANK_OPTIONS: Option[] = [
  { id: "bank", text: "은행", category: "bankType" },
  { id: "savingsBank", text: "저축은행", category: "bankType" },
  { id: "coop", text: "신협조합", category: "bankType" },
];

export const BENEFIT_OPTIONS: Option[] = [
  { id: "online", text: "비대면 가입", category: "benefit" },
  { id: "redeposit", text: "재예치", category: "benefit" },
  { id: "firstDeal", text: "첫 거래", category: "benefit" },
  { id: "age", text: "연령", category: "benefit" },
  { id: "performance", text: "실적", category: "benefit" },
];

export const TARGET_OPTIONS: Option[] = [
  { id: "none", text: "제한없음", category: "target" },
  { id: "lowIncome", text: "서민전용", category: "target" },
  { id: "limited", text: "일부제한", category: "target" },
];

export const TERM_OPTIONS: Option[] = [
  { id: "6", text: "6개월", category: "term" },
  { id: "12", text: "12개월", category: "term" },
  { id: "24", text: "24개월", category: "term" },
  { id: "36", text: "36개월", category: "term" },
];

export const INTEREST_TYPE_OPTIONS: Option[] = [
  { id: "simple", text: "단리", category: "interestType" },
  { id: "compound", text: "복리", category: "interestType" },
];

// 적립방식
export const RSRV_TYPE_OPTIONS: Option[] = [
  { id: "fixed", text: "정액적립식", category: "rsrvType" },
  { id: "free", text: "자유적립식", category: "rsrvType" },
];

export const OPTION_MAP: Record<ListCategory, Option[]> = {
  bankType: BANK_OPTIONS,
  benefit: BENEFIT_OPTIONS,
  target: TARGET_OPTIONS,
  term: TERM_OPTIONS,
  interestType: INTEREST_TYPE_OPTIONS,
  rsrvType: RSRV_TYPE_OPTIONS,
  // monthlyAmount, totalAmount → 숫자 입력/범위라서 옵션 없음
};

//TODO: filter가 타입추론 못함
export const FILTERS = [
  {
    id: "bankType",
    filterLabel: "금융권역",
    kind: "multi",
    optionCategory: "bankType",
  },
  {
    id: "benefit",
    filterLabel: "우대조건",
    kind: "multi",
    optionCategory: "benefit",
  },
  {
    id: "target",
    filterLabel: "가입대상",
    kind: "multi",
    optionCategory: "target",
  },
  {
    id: "term",
    filterLabel: "저축기간",
    kind: "multi",
    optionCategory: "term",
  },

  {
    id: "amount",
    filterLabel: "저축금",
    kind: "amount",
    fieldKey: "amount",
    unit: "원",
    min: 0,
    max: 10_000_000_000,
    step: 10_000,
    placeholder: "금액 입력",
    formatter: (v) => v.toLocaleString(),
    parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
  },

  {
    id: "baseRate",
    filterLabel: "기본 금리",
    kind: "range",
    minKey: "baseRateMin",
    maxKey: "baseRateMax",
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
    minKey: "maxRateMin",
    maxKey: "maxRateMax",
    unit: "%",
    min: 0,
    max: 20,
    step: 0.01,
    placeholders: { min: "최저 값", max: "최고 값" },
    formatter: (v) => String(v),
    parser: (s) => Number(s),
  },

  // 추가 ① 이자계산방식 (단리/복리)
  {
    id: "interestType",
    filterLabel: "이자계산방식",
    kind: "single", // 단일 선택
    optionCategory: "interestType",
  },

  // 추가 ② 적립방식 (정액/자유)
  {
    id: "rsrvType",
    filterLabel: "적립방식",
    kind: "single",
    optionCategory: "rsrvType",
  },

  // 추가 ③ 월저축금 (금액 입력)
  {
    id: "monthlyAmount",
    filterLabel: "월저축금",
    kind: "amount",
    fieldKey: "monthlyAmount",
    unit: "원",
    min: 0,
    max: 10_000_000,
    step: 10_000,
    placeholder: "금액 입력",
    formatter: (v) => v.toLocaleString(),
    parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
  },

  // 추가 ④ 총저축금 (범위)  --- range
  {
    id: "totalAmount",
    filterLabel: "총저축금",
    kind: "range",
    minKey: "totalAmountMin",
    maxKey: "totalAmountMax",
    unit: "원",
    min: 0,
    max: 1_000_000_000,
    step: 10_000,
    placeholders: { min: "최소 금액", max: "최대 금액" },
    formatter: (v) => v.toLocaleString(),
    parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
  },
] as const satisfies Filter[];

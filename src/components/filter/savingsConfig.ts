//MultiOption에서 쓰는 옵션 맵
export const OPTION_MAP = {
  bankType: ["은행", "저축은행", "신협", "수협", "농협"].map((x) => ({
    label: x,
    value: x,
  })),
  benefit: ["비대면 가입", "재예치", "첫 거래", "연령", "실적"].map((x) => ({
    label: x,
    value: x,
  })),
  target: ["제한없음", "서민전용", "일부 제한"].map((x) => ({
    label: x,
    value: x,
  })),
  term: [6, 12, 24, 36].map((n) => ({ label: `${n}개월`, value: n })),
  interestType: ["단리", "복리"].map((x) => ({ label: x, value: x })),
  rsrvType: [
    { label: "정액", value: "fixed" },
    { label: "자유", value: "free" },
  ],
  sort: [
    { label: "최고금리 높은순", value: "maxRateDesc" },
    { label: "기본금리 높은순", value: "baseRateDesc" },
    { label: "상품명 오름차", value: "nameAsc" },
    { label: "상품명 내림차", value: "nameDesc" },
  ],
} as const;

// FILTERS 포맷과 일치하도록( id, filterLabel, kind, optionCategory ...)
export const FILTERS_SAVINGS = [
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

  // select 류(단일 선택)도 MultiOption으로 values=[value] 형태로 처리
  {
    id: "interestType",
    filterLabel: "이자계산 방식",
    kind: "single",
    optionCategory: "interestType",
  },
  {
    id: "rsrvType",
    filterLabel: "적립방식",
    kind: "single",
    optionCategory: "rsrvType",
  },

  // 금액/범위
  {
    id: "monthlyAmount",
    filterLabel: "월 저축금",
    kind: "amount",
    fieldKey: "monthlyAmount",
  },
  { id: "baseRate", filterLabel: "기본 금리", kind: "range" },
  { id: "maxRate", filterLabel: "최고 금리", kind: "range" },

  // 정렬
  { id: "sort", filterLabel: "정렬", kind: "single", optionCategory: "sort" },
] as const;

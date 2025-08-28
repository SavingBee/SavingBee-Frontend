import { Filter, ListCategory, Option } from "@/types/uiFilter";

/**
 * 리스트형 팝업의 데이터
 * 공통필터, 적금필터, 예금필터
 */
// 1) 공통옵션
export const BANK_OPTIONS: Option[] = [
  { id: "은행", text: "은행", category: "bankType" },
  { id: "저축은행", text: "저축은행", category: "bankType" },
  { id: "신협", text: "신협", category: "bankType" },
];

export const BENEFIT_OPTIONS: Option[] = [
  { id: "비대면가입", text: "비대면 가입", category: "benefit" },
  { id: "재예치", text: "재예치", category: "benefit" },
  { id: "첫거래", text: "첫 거래", category: "benefit" },
  { id: "연령", text: "연령", category: "benefit" },
  { id: "실적", text: "실적", category: "benefit" },
];

export const TARGET_OPTIONS: Option[] = [
  { id: "제한없음", text: "제한없음", category: "target" },
  { id: "서민전용", text: "서민전용", category: "target" },
  { id: "일부제한", text: "일부제한", category: "target" },
];

export const TERM_OPTIONS: Option[] = [
  { id: "6", text: "6개월", category: "term" },
  { id: "12", text: "12개월", category: "term" },
  { id: "24", text: "24개월", category: "term" },
  { id: "36", text: "36개월", category: "term" },
];

export const INTEREST_TYPE_OPTIONS: Option[] = [
  { id: "단리", text: "단리", category: "interestType" },
  { id: "복리", text: "복리", category: "interestType" },
];

// 적립방식
export const RSRV_TYPE_OPTIONS: Option[] = [
  { id: "정액적립식", text: "정액적립식", category: "rsrvType" },
  { id: "자유적립식", text: "자유적립식", category: "rsrvType" },
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

// 2) 공통 필터(두 페이지 모두 노출되는 것)
export const COMMON_FILTERS = [
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
    id: "interestType",
    filterLabel: "이자계산방식",
    kind: "single",
    optionCategory: "interestType",
  },
  {
    id: "baseRate",
    filterLabel: "기본 금리",
    kind: "range",
    minKey: "intrRateMin", // API key (string으로 유지)
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
] as const satisfies Filter[];

// 3-1) 적금 전용 필터 ---------- 공통 + 적금 특이사항
export const SAVING_FILTERS: Filter[] = [
  ...COMMON_FILTERS,
  {
    id: "rsrvType",
    filterLabel: "적립방식",
    kind: "single",
    optionCategory: "rsrvType",
  },
  {
    id: "monthlyAmount",
    filterLabel: "월저축금",
    kind: "amount",
    fieldKey: "monthlyMaxLimit", // 적금전용 API key
    unit: "원",
    min: 0,
    max: 10_000_000,
    step: 10_000,
    placeholder: "금액 입력",
    formatter: (v) => v.toLocaleString(),
    parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
  },
  {
    id: "totalAmount",
    filterLabel: "총저축금",
    kind: "range",
    minKey: "totalMaxLimit",
    maxKey: "totalMaxLimit", // 서버가 단일 한도 ? ---  amount
    unit: "원",
    min: 0,
    max: 1_000_000_000,
    step: 10_000,
    placeholders: { min: "최소 금액", max: "최대 금액" },
    formatter: (v) => v.toLocaleString(),
    parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
  },
];

// 3-2) 예금 전용 필터 ------  공통 + 예금 특이사항
export const DEPOSIT_FILTERS: Filter[] = [
  ...COMMON_FILTERS,
  {
    id: "amount",
    filterLabel: "가입한도",
    kind: "range",
    minKey: "maxLimitMin", // 예금 전용 API key
    maxKey: "maxLimitMax",
    unit: "원",
    min: 0,
    max: 1_000_000_000,
    step: 10_000,
    placeholders: { min: "최소 금액", max: "최대 금액" },
    formatter: (v) => v.toLocaleString(),
    parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
  },
];

// //TODO: filter가 타입추론 못함
// export const FILTERS = [
//   {
//     id: "bankType",
//     filterLabel: "금융권역",
//     kind: "multi",
//     optionCategory: "bankType",
//   },
//   {
//     id: "benefit",
//     filterLabel: "우대조건",
//     kind: "multi",
//     optionCategory: "benefit",
//   },
//   {
//     id: "target",
//     filterLabel: "가입대상",
//     kind: "multi",
//     optionCategory: "target",
//   },
//   {
//     id: "term",
//     filterLabel: "저축기간",
//     kind: "multi",
//     optionCategory: "term",
//   },

//   {
//     id: "amount",
//     filterLabel: "저축금",
//     kind: "amount",
//     fieldKey: "amount",
//     unit: "원",
//     min: 0,
//     max: 10_000_000_000,
//     step: 10_000,
//     placeholder: "금액 입력",
//     formatter: (v) => v.toLocaleString(),
//     parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
//   },

//   {
//     id: "baseRate",
//     filterLabel: "기본 금리",
//     kind: "range",
//     minKey: "baseRateMin",
//     maxKey: "baseRateMax",
//     unit: "%",
//     min: 0,
//     max: 20,
//     step: 0.01,
//     placeholders: { min: "최저 값", max: "최고 값" },
//     formatter: (v) => String(v),
//     parser: (s) => Number(s),
//   },

//   {
//     id: "maxRate",
//     filterLabel: "최고 금리",
//     kind: "range",
//     minKey: "maxRateMin",
//     maxKey: "maxRateMax",
//     unit: "%",
//     min: 0,
//     max: 20,
//     step: 0.01,
//     placeholders: { min: "최저 값", max: "최고 값" },
//     formatter: (v) => String(v),
//     parser: (s) => Number(s),
//   },

//   // 추가 ① 이자계산방식 (단리/복리)
//   {
//     id: "interestType",
//     filterLabel: "이자계산방식",
//     kind: "single", // 단일 선택
//     optionCategory: "interestType",
//   },

//   // 추가 ② 적립방식 (정액/자유)
//   {
//     id: "rsrvType",
//     filterLabel: "적립방식",
//     kind: "single",
//     optionCategory: "rsrvType",
//   },

//   // 추가 ③ 월저축금 (금액 입력)
//   {
//     id: "monthlyAmount",
//     filterLabel: "월저축금",
//     kind: "amount",
//     fieldKey: "monthlyAmount",
//     unit: "원",
//     min: 0,
//     max: 10_000_000,
//     step: 10_000,
//     placeholder: "금액 입력",
//     formatter: (v) => v.toLocaleString(),
//     parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
//   },

//   // 추가 ④ 총저축금 (범위)  --- range
//   {
//     id: "totalAmount",
//     filterLabel: "총저축금",
//     kind: "range",
//     minKey: "totalAmountMin",
//     maxKey: "totalAmountMax",
//     unit: "원",
//     min: 0,
//     max: 1_000_000_000,
//     step: 10_000,
//     placeholders: { min: "최소 금액", max: "최대 금액" },
//     formatter: (v) => v.toLocaleString(),
//     parser: (s) => Number(String(s).replace(/[^\d]/g, "")),
//   },
// ] as const satisfies Filter[];

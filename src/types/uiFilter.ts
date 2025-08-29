/**
 * 필터 UI 스키마
 * ListFilter - 옵션선택
 * AmountFilter - 단일금액
 * RangeFilter - 범위 입력
 *
 * apiFilter.ts 타입을 추가    -------fieldKey
 */
export type Selected = {
  bankType: string[];
  benefit: string[];
  target: string[];
  term: string[];
  interestType: string[];
  rsrvType?: string[]; // saving 전용은 optional로
};

export type ListCategory =
  | "bankType"
  | "benefit"
  | "target"
  | "term"
  | "rsrvType"
  | "interestType";
// | "monthlyAmount" //
// | "totalAmount"; //
export type NumberCategory =
  | "amount"
  | "baseRate"
  | "maxRate"
  | "totalAmount"
  | "monthlyAmount";
export type FilterCategory = ListCategory | NumberCategory;

export type Option = {
  id: string;
  text: string;
  category: ListCategory;
};

export type FilterKind = "single" | "multi" | "amount" | "range";

export type ListFilter = {
  id: FilterCategory;
  filterLabel: string;
  kind: FilterKind;
  optionCategory: ListCategory;
};

export type AmountFilter = {
  id: string;
  filterLabel: string;
  kind: "amount";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  formatter?: (v: number) => string;
  parser?: (s: string) => number;
  placeholder?: string;

  fieldKey: string; // API key
};

export type RangeFilter = {
  id: string;
  filterLabel: string;
  kind: "range";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  formatter?: (v: number) => string;
  parser?: (s: string) => number;
  placeholders?: { min?: string; max?: string };

  minKey: string; // API key
  maxKey: string; // API key
};

export type Filter = ListFilter | AmountFilter | RangeFilter;

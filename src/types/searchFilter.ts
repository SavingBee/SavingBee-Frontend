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
  fieldKey: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  formatter?: (v: number) => string;
  parser?: (s: string) => number;
  placeholder?: string;
};

export type RangeFilter = {
  id: string;
  filterLabel: string;
  kind: "range";
  minKey: string;
  maxKey: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  formatter?: (v: number) => string;
  parser?: (s: string) => number;
  placeholders?: { min?: string; max?: string };
};

export type Filter = ListFilter | AmountFilter | RangeFilter;

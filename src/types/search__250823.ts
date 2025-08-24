export type SortKey =
  | "maxRateDesc"
  | "maxRateAsc"
  | "baseRateDesc"
  | "baseRateAsc"
  | "nameAsc"
  | "nameDesc";

// 공통 필터
export interface FilterBase {
  keyword: string;
  bankType: string[]; // ["은행","저축은행",...]
  benefit: string[]; // ["비대면가입","첫거래",...]
  target: string[]; // ["제한없음","서민전용",...]
  term: number[]; // [12,24]
  interestType?: "단리" | "복리";
  baseRateMin?: number;
  baseRateMax?: number;
  maxRateMin?: number;
  maxRateMax?: number;
  sort: SortKey;
  page: number;
  pageSize: number;
}

//
export interface DepositFilter extends FilterBase {
  // deposit-specific: e.g., amountMin/Max
  amountMin?: number;
  amountMax?: number;
}

// 적금 필터 = 공통 + 적금 전용
export interface SavingsFilter extends FilterBase {
  rsrvType?: "fixed" | "free";
  monthlyAmountMin?: number;
  monthlyAmountMax?: number;
}

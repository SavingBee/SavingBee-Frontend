type CommonMonths = 6 | 12 | 24 | 36;
type RateTypeKind = "단리" | "복리";

// UI
export type CompareListItem = {
  id: string;
  logoUrl?: string;
  productName: string;
  bankName: string;
  baseRate: number; // = intrRate
  maxRate: number; // = intrRate2
};

export type SavingsFilter = {
  kind: "savings";
  amount?: number;
  months?: CommonMonths;
  minRate?: number;
  rateType?: RateTypeKind;
};

export type DepositFilter = {
  kind: "deposit";
  principal?: number;
  months?: CommonMonths;
  minRate?: number;
  rateType?: RateTypeKind;
};

// 요청할때
export type CompareListQuery = {
  type: "D" | "S";
  amount: number;
  termMonth: 6 | 12 | 24 | 36;
  minRate: number;
  intrRateType: "S" | "M";
  bankKeyword?: string;
  page?: number;
  size?: number;
};

export type CompareListResponse = {
  productId: string;
  bankName: string;
  productName: string;
  intrRate: number;
  intrRate2: number;
  termMonth: number;
  intrRateType: "S" | "M";
};

export type GetCompareResponse = {
  content: CompareListResponse[];
  page: number;
  size: number;
  totalElements: number;
};

// body 요청 할때
export type CompareRequest = {
  productIds: string[];
  type: "D" | "S";
  amount: number;
  termMonth: 6 | 12 | 24 | 36;
  intrRateType: "S" | "M";
};

export type CompareResponseItem = {
  productId: string;
  bankName: string;
  productName: string;
  intrRateBeforeTax: number;
  intrRateAfterTax: number;
  highestPrefRate: number;
  intrAfterTax: number;
  amountReceived: number;
  winner: boolean;
  intrRateType: "S" | "M";
};

export type CompareResponse = {
  info: CompareResponseItem[];
  winnerId: string | null;
};

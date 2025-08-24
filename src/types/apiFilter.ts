//필터 API 스키마
export type ProductType = "saving" | "deposit";

export type BaseFilter = {
  finCoType?: string[]; // 은행, 저축은행, 신협...
  joinWay?: string[]; // 비대면가입, 첫거래...
  joinDeny?: string[]; // 제한없음, 서민전용, 일부제한
  saveTrm?: number[]; // 6,12,24,36
  intrRateType?: "단리" | "복리";
  intrRateMin?: number;
  intrRateMax?: number;
  intrRate2Min?: number;
  intrRate2Max?: number;
  page?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};

export type SavingOnly = {
  monthlyMaxLimit?: number;
  totalMaxLimit?: number;
};

export type DepositOnly = {
  maxLimitMin?: number;
  maxLimitMax?: number;
};

export type SavingFilter = BaseFilter & SavingOnly;
export type DepositFilter = BaseFilter & DepositOnly;

export type AnyFilter = SavingFilter | DepositFilter;

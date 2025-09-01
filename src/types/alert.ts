export type AlertTypeUI = "EMAIL" | "SMS" | "PUSH";
export type AlertTypeAPI = "EMAIL" | "SMS" | "PUSH";

export const ALLOWED_MONTHS = [6, 12, 24, 36] as const;
export type TermMonth = (typeof ALLOWED_MONTHS)[number];

export interface AlertSettingsBody {
  alertType: AlertTypeAPI;
  productTypeDeposit: boolean;
  productTypeSaving: boolean;
  minInterestRate: number | null;
  interestCalcSimple: boolean;
  interestCalcCompound: boolean;
  maxSaveTerm: TermMonth | null;
  minAmount: number | null;
  maxLimit: number | null;
}

export interface AlertSettingsResponse extends AlertSettingsBody {
  userId: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export const toApiAlertType = (ui: AlertTypeUI): AlertTypeAPI =>
  ui === "SMS" ? "SMS" : ui;
export const toUiAlertType = (api: AlertTypeAPI): AlertTypeUI =>
  api === "SMS" ? "SMS" : api;

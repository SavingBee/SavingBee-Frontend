import { SavingsRate } from "@/types/product";

/**
 * 상품 : 옵션 = 1 : N
 */
export const SAVINGS_RATES: SavingsRate[] = [
  {
    id: "SVG001",
    termMonths: 12,
    baseRate: 3.1,
    maxRate: 3.9,
    rsrvType: "free",
  },
  {
    id: "SVG001",
    termMonths: 24,
    baseRate: 3.2,
    maxRate: 4.1,
    rsrvType: "free",
  },
  {
    id: "SVG002",
    termMonths: 12,
    baseRate: 3.3,
    maxRate: 4.0,
    rsrvType: "fixed",
  },
  {
    id: "SVG002",
    termMonths: 24,
    baseRate: 3.4,
    maxRate: 4.2,
    rsrvType: "fixed",
  },
  {
    id: "SVG003",
    termMonths: 12,
    baseRate: 3.0,
    maxRate: 3.7,
    rsrvType: "free",
  },
  {
    id: "SVG003",
    termMonths: 12,
    baseRate: 3.2,
    maxRate: 3.9,
    rsrvType: "fixed",
  },
  {
    id: "SVG003",
    termMonths: 24,
    baseRate: 3.1,
    maxRate: 3.8,
    rsrvType: "free",
  },
  {
    id: "SVG003",
    termMonths: 24,
    baseRate: 3.3,
    maxRate: 4.0,
    rsrvType: "fixed",
  },
];

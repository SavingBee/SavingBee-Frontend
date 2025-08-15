// export const savingsListData: SavingsListItem[] = [
//   {
//     productId: "SAV001",
//     productName: "Sh첫만남우대적금",
//     bankName: "SH수협은행",
//     baseRate: 1.85,
//     maxRate: 2.9,
//     rsrvType: "fixed",
//   },
//   {
//     productId: "SAV002",
//     productName: "KB Star 정기적금",
//     bankName: "KB국민은행",
//     baseRate: 2.0,
//     maxRate: 3.2,
//     rsrvType: "free",
//   },
// ];

/**
 * 리스트 화면에 보여질 데이터 정리
 */
import kbLogo from "./images/kb_logo.png";
import wooriLogo from "./images/woori_logo.png";

export interface SavingsListItem {
  id: string;
  logoUrl: string;
  productName: string;
  bankName: string;
  baseRate: number;
  maxRate: number;
}

export const savingsListData: SavingsListItem[] = [
  {
    id: "SVG001",
    logoUrl: wooriLogo,
    productName: "자유적금 플러스",
    bankName: "우리은행",
    maxRate: 3.0,
    baseRate: 2.2,
  },
  {
    id: "SVG002",
    logoUrl: kbLogo,
    productName: "정액적립 적금",
    bankName: "국민은행",
    maxRate: 3.3,
    baseRate: 2.5,
  },
  {
    id: "SVG003",
    logoUrl: "/banks/sh.png",
    productName: "스마트 저축 적금",
    bankName: "신한은행",
    maxRate: 3.1,
    baseRate: 2.0,
  },
];

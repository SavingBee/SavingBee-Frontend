import kbLogo from "./images/kb_logo.png";
import wooriLogo from "./images/woori_logo.png";

export type CompareListItem = {
  id: string;
  logoUrl: string;
  productName: string;
  bankName: string;
  baseRate: number;
  maxRate: number;
};

export const savingsCompareData: CompareListItem[] = [
  {
    id: "SVG201",
    logoUrl: wooriLogo,
    productName: "자유적금 플러스",
    bankName: "우리은행",
    baseRate: 2.2,
    maxRate: 3.0,
  },
  {
    id: "SVG202",
    logoUrl: kbLogo,
    productName: "정액적립 적금",
    bankName: "국민은행",
    baseRate: 2.5,
    maxRate: 3.3,
  },
  {
    id: "SVG203",
    logoUrl: "/banks/sh.png",
    productName: "스마트 저축 적금",
    bankName: "신한은행",
    baseRate: 2.0,
    maxRate: 3.1,
  },
  {
    id: "SVG204",
    logoUrl: "/banks/nh.png",
    productName: "청년 우대 적금",
    bankName: "NH농협",
    baseRate: 2.3,
    maxRate: 3.2,
  },
  {
    id: "SVG205",
    logoUrl: "/banks/sh.png",
    productName: "스마트 저축 적금11",
    bankName: "신한은행",
    baseRate: 2.0,
    maxRate: 3.1,
  },
  {
    id: "SVG2056",
    logoUrl: "/banks/nh.png",
    productName: "청년 우대 적금12",
    bankName: "NH농협",
    baseRate: 2.3,
    maxRate: 3.2,
  },
  {
    id: "SVG207",
    logoUrl: "/banks/sh.png",
    productName: "스마트 저축 적금13",
    bankName: "신한은행",
    baseRate: 2.0,
    maxRate: 3.1,
  },
  {
    id: "SVG208",
    logoUrl: "/banks/nh.png",
    productName: "청년 우대 적금14",
    bankName: "NH농협",
    baseRate: 2.3,
    maxRate: 3.2,
  },
];

export const depositCompareData: CompareListItem[] = [
  {
    id: "DEP301",
    logoUrl: "/banks/hana.png",
    productName: "하나 정기예금",
    bankName: "하나은행",
    baseRate: 2.6,
    maxRate: 3.1,
  },
  {
    id: "DEP302",
    logoUrl: kbLogo,
    productName: "국민 정기예금",
    bankName: "국민은행",
    baseRate: 2.7,
    maxRate: 3.2,
  },
  {
    id: "DEP303",
    logoUrl: "/banks/ibk.png",
    productName: "IBK e-정기예금",
    bankName: "기업은행",
    baseRate: 2.5,
    maxRate: 3.0,
  },
  {
    id: "DEP304",
    logoUrl: "/banks/sh.png",
    productName: "신한 쏠편한 예금",
    bankName: "신한은행",
    baseRate: 2.8,
    maxRate: 3.3,
  },
];

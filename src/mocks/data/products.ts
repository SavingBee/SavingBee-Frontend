export type Product = {
  fin_prdt_cd: string;
  fin_prdt_nm: string;
  kor_co_nm: string;
  product_type: "deposit" | "saving";
  max_intr_rate: number;
  base_intr_rate: number;
};

export const products: Product[] = [
  {
    fin_prdt_cd: "WR0001A",
    fin_prdt_nm: "우리웰리치 주거래예금",
    kor_co_nm: "우리은행",
    product_type: "deposit",
    max_intr_rate: 2.25,
    base_intr_rate: 2.0,
  },
  {
    fin_prdt_cd: "SH0001S",
    fin_prdt_nm: "신한 청년적금",
    kor_co_nm: "신한은행",
    product_type: "saving",
    max_intr_rate: 2.9,
    base_intr_rate: 2.5,
  },
  {
    fin_prdt_cd: "KB0001A",
    fin_prdt_nm: "KB Star 정기예금",
    kor_co_nm: "KB국민은행",
    product_type: "deposit",
    max_intr_rate: 3.1,
    base_intr_rate: 2.8,
  },
  {
    fin_prdt_cd: "NH0001D",
    fin_prdt_nm: "NH올원 예금",
    kor_co_nm: "농협은행",
    product_type: "deposit",
    max_intr_rate: 2.8,
    base_intr_rate: 2.5,
  },
  {
    fin_prdt_cd: "NH0001D",
    fin_prdt_nm: "우리테스트",
    kor_co_nm: "농협은행",
    product_type: "deposit",
    max_intr_rate: 2.8,
    base_intr_rate: 2.5,
  },
];

export const popularProducts: Product[] = [
  {
    fin_prdt_cd: "KB0001A",
    fin_prdt_nm: "KB Star 정기예금",
    kor_co_nm: "KB국민은행",
    product_type: "deposit",
    max_intr_rate: 3.1,
    base_intr_rate: 2.8,
  },
  {
    fin_prdt_cd: "SH0001S",
    fin_prdt_nm: "신한 청년적금",
    kor_co_nm: "신한은행",
    product_type: "saving",
    max_intr_rate: 2.9,
    base_intr_rate: 2.6,
  },
  {
    fin_prdt_cd: "NH0001D",
    fin_prdt_nm: "NH올원 예금",
    kor_co_nm: "농협은행",
    product_type: "deposit",
    max_intr_rate: 2.8,
    base_intr_rate: 2.5,
  },
];

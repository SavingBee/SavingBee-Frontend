//  /api/products/:id 엔드포인트

export type ProductType = "deposit" | "saving";

export interface InterestRateBase {
  save_trm: number;
  intr_rate_type_nm: string;
  intr_rate: number;
  intr_rate2: number;
}

// 예금 전용 금리 타입
export interface DepositInterestRate extends InterestRateBase {}

// 적금 전용 금리 타입 (추가 필드 포함)
export interface SavingsInterestRate extends InterestRateBase {
  rsrv_type_nm: string;
  totalMaxLimit: number;
}

// 공통: 상세 응답 베이스
export interface ProductDetailBase {
  fin_prdt_cd: string;
  fin_prdt_nm: string;
  product_type: ProductType;
  fin_co_no: string;
  kor_co_nm: string;
  join_way: string;
  join_deny_nm: string;
  join_member: string;
  max_limit: number;
  spcl_cnd: string;
  mtrt_int: string;
  etc_note: string;
  dcls_strt_day: string;
  dcls_end_day: string | null;
}

// 예금 상세 응답
export interface DepositProductDetail extends ProductDetailBase {
  product_type: "deposit";
  interest_rates: DepositInterestRate[];
}

// 적금 상세 응답
export interface SavingsProductDetail extends ProductDetailBase {
  product_type: "saving";
  interest_rates: SavingsInterestRate[];
}

export type ProductDetail = DepositProductDetail | SavingsProductDetail;

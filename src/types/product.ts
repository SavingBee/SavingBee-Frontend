export type ProductType = "savings" | "deposit";
export type RsrvType = "fixed" | "free"; // 적금전용 적립방식 - 정액, 자유

/************* 예,적금 공통 ****************/
/**
 * id, 상품명, 은행코드,은행이름,가입방법, 가입대상,
 * fin_prdt_cd
 * fin_prdt_nm
 * fn_co_no
 * kor_co_nm
 *
 * 가입방법,가입대상,판매중 여부
 */

export interface ProductBase {
  id: string;
  name: string;
  bankCode: string;
  bankName: string;
  joinWay?: string;
  joinMember?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string; // ISO
  notes?: string;
}

/** 예금 전용 */
export interface DepositProduct extends ProductBase {
  type: "deposit";
}

/** 적금 전용 */
export interface SavingsProduct extends ProductBase {
  type: "savings";
}

/************* 금리옵션 ****************/
/**
 * id, 저축기간,(월), 기본금리, 우대금리, 이자유형(단리,복리)
 * 적금전용타입 (rsrv), 월최소납입-최대납입
 */

export interface BaseRate {
  id: string;
  termMonths: number;
  baseRate: number;
  maxRate: number;
  rateType?: "단리" | "복리";
}

export interface DepositRate extends BaseRate {}

export interface SavingsRate extends BaseRate {
  rsrvType: RsrvType;
  monthlyLimitMin?: number;
  monthlyLimitMax?: number;
}

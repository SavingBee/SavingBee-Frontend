import axios from "axios";
import qs from "qs";
import type { Product } from "@/types/search";
import type { SavingFilter } from "@/types/apiFilter";

// 리스트 응답 타입
export type SavingsListResponse = {
  content: Product[];
  totalPages: number;
  totalElements: number;
};

// 기존
export type SavingsListParams = SavingFilter & {
  q?: string;
  pageSize?: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_SAVINGS = "/products/filter/saving"; // 엔드포인트

export const api = axios.create({
  baseURL: API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
  // 배열 직렬화 규칙
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "comma" }), // 배열 → a,b,c
  },
});

// 필터 API(메인 리스트)
export async function fetchSavingsList(
  params: SavingsListParams,
): Promise<SavingsListResponse> {
  const next: SavingsListParams = { ...params };

  // q가 있을 때만 길이 체크
  const keyword = (next.q ?? "").trim();
  if (keyword && keyword.length < 2) {
    throw new Error("검색어는 2자 이상 입력해주세요");
    //ui 처리
  }
  if (keyword) next.q = keyword;
  else delete next.q;

  // page/pageSize 기본값 처리 (서버 확인)
  if (!next.page || next.page < 1) next.page = 1;
  if (!next.pageSize) next.pageSize = 20;

  const res = await api.get<SavingsListResponse>(API_SAVINGS, { params: next });
  return res.data;
}

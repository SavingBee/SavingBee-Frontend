import axios from "axios";
import type { SearchResponse } from "@/types/search";

const API_BASE_URL = "";
export const API_SEARCH = "/products/search";

const api = axios.create({
  baseURL: API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
});

export async function searchProducts(q: string): Promise<SearchResponse> {
  const keyword = (q ?? "").trim();
  if (keyword.length < 2) {
    throw new Error("검색어는 2자 이상 입력해주세요");
  }
  const res = await api.get<SearchResponse>(API_SEARCH, {
    params: { q: keyword },
  });
  return res.data;
}

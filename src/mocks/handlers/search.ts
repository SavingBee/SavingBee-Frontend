import { http, HttpResponse } from "msw";
import { products, popularProducts } from "../data/products";

export const searchHandler = http.get("/products/search", ({ request }) => {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim();

  // 3. 요청 오류: 2자 미만
  if (q.length < 2) {
    return HttpResponse.json(
      {
        status: 400,
        error: "검색어는 2자 이상이어야 합니다",
        searchTerm: q,
      },
      { status: 400 },
    );
  }

  // 대소문자/부분일치: 상품명, 은행명
  const qLower = q.toLowerCase();
  const hits = products.filter((p) => {
    const hay = `${p.fin_prdt_nm} ${p.kor_co_nm}`.toLowerCase();
    return hay.includes(qLower);
  });

  // 1. 검색 성공: 결과 있음
  if (hits.length > 0) {
    return HttpResponse.json({
      products: hits,
      totalCount: hits.length,
      searchTerm: q,
    });
  }

  // 2. 검색 결과 없음: 인기상품 추천 포함
  return HttpResponse.json({
    products: [],
    popularProducts,
    totalCount: 0,
    searchTerm: q,
    message: "검색 결과가 없어 인기 상품을 추천합니다",
  });
});

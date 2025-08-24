import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * 검색, 필터 공용 --- 쿼리 합치기
 */
export function useQueryParams(keep: string[] = ["q"]) {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  //검색어 저장
  function applySearch(value: string) {
    const kw = (value || "").trim();
    const next = new URLSearchParams(sp);
    if (kw) next.set("q", kw);
    else next.delete("q");
    next.set("page", "1");
    navigate({ search: `?${next.toString()}` }, { replace: true });
  }

  // flat: { [k]: string | number } 형태의 평탄화된 파라미터
  function apply(flat: Record<string, any>) {
    const next = new URLSearchParams(sp);
    // keep 목록만 남기고 모두 제거
    next.forEach((_, key) => {
      if (!keep.includes(key)) next.delete(key);
    });
    // 평탄화 값 set
    Object.entries(flat).forEach(([k, v]) => {
      if (v == null || v === "") return;
      next.set(k, String(v));
    });
    next.set("page", "1");
    navigate({ search: `?${next.toString()}` }, { replace: true });
  }

  return { applySearch, apply };
}

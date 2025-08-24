import { useNavigate, useSearchParams } from "react-router-dom";

export function useSearchQuery() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  // 현재 검색어
  const q = (sp.get("q") || "").trim();

  // 검색어 반영
  function applySearch(value: string) {
    const kw = (value || "").trim();
    const next = new URLSearchParams(sp);
    if (kw) next.set("q", kw);
    else next.delete("q");
    next.set("page", "1");
    navigate({ search: `?${next.toString()}` }, { replace: true });
  }

  // 검색어만 초기화 (필터 유지)
  //   function clearSearch() {
  //     const next = new URLSearchParams(sp);
  //     next.delete("q");
  //     next.set("page", "1");
  //     navigate({ search: `?${next.toString()}` }, { replace: true });
  //   }

  return { q, applySearch, searchParams: sp };
}

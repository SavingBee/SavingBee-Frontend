import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import SearchForm from "./SearchForm";

//drowpdown은 productList를 import하여 사용
import ProductList from "@/components/product/ProductList";
import type { ProductListItemProps } from "../product/ProductListItem";
//검색관련
import { useSearchQuery } from "@/hooks/filter/useSearchQuery";
import type { SearchResponse } from "@/types/search";
import { searchProducts } from "@/api/search";

// type ProductListItemProps = {
//   id: string | number;
//   title: string;
//   subtitle?: string; // 은행명 등
//   rightLabel?: string; // 우대금리
//   rightValue?: string; // 2.90% 등
//   rightSub?: string; // 기본 1.85% 등
//   logoUrl?: string;
// };

//검색 훅

const MOCK: ProductListItemProps[] = [
  {
    fin_prdt_cd: "WR0001A",
    fin_prdt_nm: "sh kb 우리웰리치 주거래예금",
    kor_co_nm: "우리은행",
    product_type: "deposit",
    max_intr_rate: 2.25,
    base_intr_rate: 2.0,
    //logo_url: "/images/banks/woori.png",
  },
  {
    fin_prdt_cd: "SH0001S",
    fin_prdt_nm: "sh kb 신한 청년적금",
    kor_co_nm: "신한은행",
    product_type: "savings",
    max_intr_rate: 2.9,
    base_intr_rate: 2.5,
  },
];

function mockFilter(list: ProductListItemProps[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return list.filter((it) => it.fin_prdt_nm.toLowerCase().includes(s));
}

export default function SearchBox() {
  const { q, applySearch } = useSearchQuery(); // 검색 쿼리 전달 훅
  const [keyword, setKeyword] = useState(""); // 검색 입력
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProductListItemProps[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false); // 제출 플래그
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //새로고침 - url 리셋
  useEffect(() => {
    if (location.search) navigate({ search: "" }, { replace: true });
  }, []);
  // 바깥 클릭 닫기
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // q 변경(= applySearch 성공) 시 서버 호출 → 결과 세팅 → 드롭다운 열기
  useEffect(() => {
    const run = async () => {
      if (!q || !hasSubmitted) {
        // URL에 q가 있어도 "사용자 제출"이 아니면 열지 않음
        setOpen(false);
        return;
      }
      setLoading(true);

      // 실제 API로 교체
      // const res: SearchResponse = await searchProducts(q);
      // const list = res.products?.length ? res.products
      //            : ("popularProducts" in res ? res.popularProducts : []);
      // 임시: 목업 필터
      const list = mockFilter(MOCK, q);

      setResults(list);
      setLoading(false);
      setOpen(true); // 결과가 0이어도 패널은 열고 빈 상태 노출
    };
    run();
  }, [q, hasSubmitted]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
  }
  function handleSubmit() {
    const s = keyword.trim();
    if (!s) {
      setHasSubmitted(false);
      setResults([]);
      setOpen(false);
      return;
    }
    setHasSubmitted(true); // 제출 플래그
    applySearch(s); // 서버로 쿼리 전달(URL q 갱신)
  }
  const searchMain = "max-h-96 overflow-auto ";

  return (
    <div ref={wrapRef} className="relative" onKeyDown={handleKeyDown}>
      <SearchForm
        value={keyword}
        onChange={(v) => {
          setKeyword(v);
          setHasSubmitted(false); // 입력 변경 시 제출 상태 해제
          setOpen(false); // 입력 중에는 닫힘
        }}
        onSubmit={handleSubmit}
        className="mb-2"
        placeholder="상품명을 입력해주세요"
      />
      {/* 드롭다운 wrap 박스 ---- 그 내부에서 ProductList 호출 */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-blue-200 bg-white shadow-xl z-50 overflow-hidden p-2"
          role="listbox"
          aria-label="검색 결과"
        >
          {loading ? (
            // 로딩 상태: 간단한 스켈레톤/로딩 텍스트
            <div className="py-6 text-center text-sm text-gray-500">
              검색 중…
            </div>
          ) : results.length > 0 ? (
            // 결과 있음
            <ProductList
              open={open}
              loading={loading}
              listClassName={searchMain}
              items={results}
              disableItemActions
              onSelect={(item: ProductListItemProps) => {
                setOpen(false);
                navigate(`/products/${item.fin_prdt_cd}`);
              }}
              onClose={() => setOpen(false)}
            />
          ) : (
            // 결과 없음: 제출된 상태에서만 노출
            <div className="py-10 px-4 text-center text-sm text-gray-500">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import SearchForm from "./SearchForm";

//drowpdown은 productList를 import하여 사용
import ProductList from "@/components/product/ProductList";
import type { ProductListItemProps } from "../product/ProductListItem";
//검색관련
import { useSearchQuery } from "@/hooks/filter/useSearchQuery";

//api
import { searchProducts } from "@/api/search";
import type { SearchResponse } from "@/types/search";

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

// const MOCK: ProductListItemProps[] = [
//   {
//     fin_prdt_cd: "WR0001A",
//     fin_prdt_nm: "sh kb 우리웰리치 주거래예금",
//     kor_co_nm: "우리은행",
//     product_type: "deposit",
//     max_intr_rate: 2.25,
//     base_intr_rate: 2.0,
//     //logo_url: "/images/banks/woori.png",
//   },
//   {
//     fin_prdt_cd: "SH0001S",
//     fin_prdt_nm: "sh kb 신한 청년적금",
//     kor_co_nm: "신한은행",
//     product_type: "savings",
//     max_intr_rate: 2.9,
//     base_intr_rate: 2.5,
//   },
// ];

// function mockFilter(list: ProductListItemProps[], q: string) {
//   const s = q.trim().toLowerCase();
//   if (!s) return [];
//   return list.filter((it) => it.fin_prdt_nm.toLowerCase().includes(s));
// }

export default function SearchBox() {
  const { q, applySearch } = useSearchQuery(); // 검색 쿼리 전달 훅
  const [keyword, setKeyword] = useState(""); // 검색 입력
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProductListItemProps[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false); // 제출 플래그
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  //추천상품 관련
  const [isPopular, setIsPopular] = useState(false);
  const [bannerMsg, setBannerMsg] = useState<string | null>(null);
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

  /*******************
   * q 변경(= applySearch 성공) 시 서버 호출 -> 결과 세팅 -> 드롭다운 열기
   *
   *
   *******************/
  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      // 제출이전 - 실행 종료
      if (!q || !hasSubmitted) {
        setOpen(false);
        setResults([]);
        setErrorMsg(null);
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      try {
        const res: SearchResponse = await searchProducts(q);
        const has = "products" in res && res.products.length > 0;
        const list = has
          ? res.products
          : "popularProducts" in res
            ? res.popularProducts
            : [];

        // ProductListItemProps와 필드가 동일하므로 바로 세팅
        setResults(list as unknown as ProductListItemProps[]);
        setIsPopular(!has);
        // 응답에 message가 있으면 사용, 없으면 디폴트 문구
        if (!has) {
          const msg =
            "message" in res && res.message
              ? res.message
              : `‘${q}’에 대한 검색 결과가 없습니다. 인기 상품을 추천합니다.`;
          setBannerMsg(msg);
        } else {
          setBannerMsg(null);
        }

        setOpen(true);
      } catch (e: any) {
        // 400 등 에러 처리
        setResults([]);
        setOpen(true); // 에러 메시지를 드롭다운에서 보여주기 -> 열어둠
        setErrorMsg(e?.message ?? "검색 중 오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    }

    run();

    return () => controller.abort();
  }, [q, hasSubmitted]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
  }
  function handleSubmit() {
    const s = keyword.trim();
    if (!s) {
      setHasSubmitted(false);
      setResults([]);
      setErrorMsg(null);
      return;
    }
    // 검색어 2자 이하 ->  에러 처리
    if (s.length < 2) {
      setHasSubmitted(false);
      setResults([]);
      setOpen(true); // 드롭다운에 에러를 보여주기 -> open
      setErrorMsg("검색어는 2자 이상 입력해주세요");
      return;
    }
    setHasSubmitted(true); // 제출 플래그
    setErrorMsg(null);
    applySearch(s); // 서버로 쿼리 전달(URL q 갱신)
  }

  const resetOnTyping = () => {
    setHasSubmitted(false);
    setOpen(false);
    setErrorMsg(null);
    setIsPopular(false);
    setBannerMsg(null);
  };

  const handleChange = useCallback((v: string) => {
    setKeyword(v);
    resetOnTyping();
  }, []);

  const searchMain = "max-h-96 overflow-auto ";

  return (
    <div ref={wrapRef} className="relative" onKeyDown={handleKeyDown}>
      <SearchForm
        value={keyword}
        onChange={handleChange}
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
            <div className="py-6 text-center text-sm text-gray-500">
              검색 중…
            </div>
          ) : errorMsg ? (
            <div
              className="py-10 px-4 text-center text-sm text-red-600"
              aria-live="assertive"
            >
              {errorMsg}
            </div>
          ) : results.length > 0 ? (
            <>
              {isPopular && (
                <div className="mb-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs text-blue-700">
                  {" "}
                  {bannerMsg ??
                    `‘${q}’에 대한 검색 결과가 없습니다. 인기 상품을 추천합니다.`}{" "}
                </div>
              )}
              {open && (
                <ProductList
                  listClassName={searchMain}
                  items={results}
                  disableItemActions
                  onSelect={(item: ProductListItemProps) => {
                    navigate(`/products/${item.fin_prdt_cd}`);
                  }}
                  onClose={() => setOpen(false)}
                />
              )}
            </>
          ) : (
            <div className="py-10 px-4 text-center text-sm text-gray-500">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}

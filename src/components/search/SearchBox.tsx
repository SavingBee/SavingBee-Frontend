import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import SearchForm from "./SearchForm";

//drowpdown은 productList를 import하여 사용
import ProductList from "@/components/product/ProductList";
import type { ProductListItemProps } from "../product/ProductListItem";

// type ProductListItemProps = {
//   id: string | number;
//   title: string;
//   subtitle?: string; // 은행명 등
//   rightLabel?: string; // 우대금리
//   rightValue?: string; // 2.90% 등
//   rightSub?: string; // 기본 1.85% 등
//   logoUrl?: string;
// };

const MOCK: ProductListItemProps[] = [
  {
    id: "1",
    logoUrl: "/banks/sh.png",
    productName: "Sh첫만남우대예금 KB",
    bankName: "SH수협은행",
    maxRate: 2.9,
    baseRate: 1.85,
    detail: "신규 우대",
  },
  {
    id: "2",
    logoUrl: "/banks/kb.png",
    productName: "KB Star 정기적금 SH",
    bankName: "KB국민은행",
    maxRate: 3.2,
    baseRate: 2.0,
    detail: "비대면 가입",
  },
];

function mockFilter(list: ProductListItemProps[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return list.filter((it) => it.productName.toLowerCase().includes(s));
}

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProductListItemProps[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 외부 클릭으로 닫기
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // 제출(엔터/버튼)
  async function handleSubmit() {
    if (query.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);

    // 지금은 UI 확인용 목업 필터
    const data = mockFilter(MOCK, query);

    setResults(data);
    setLoading(false);
    setOpen(true);
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
  }
  return (
    <div ref={wrapRef} className="relative" onKeyDown={handleKeyDown}>
      <SearchForm
        value={query}
        onChange={(v) => {
          setQuery(v);
          // 입력 중에도 패널 열기
          if (v.trim()) setOpen(true);
        }}
        //API호출
        onSubmit={() => handleSubmit()}
        className="mb-2"
        placeholder="상품명을 입력해주세요"
      />

      {/* 드롭다운 wrap 박스 ---- 그 내부에서 ProductList 호출 */}
      {open && (
        <div
          className=" absolute left-0 right-0 top-full mt-2 rounded-2xl border border-blue-200 bg-white shadow-xl z-50 max-h-96 overflow-auto p-2 "
          role="listbox"
          aria-label="검색 결과"
        >
          <ProductList
            open={open}
            loading={loading}
            items={results}
            disableItemActions // ← 드롭다운 모드 활성화
            onSelect={(item: ProductListItemProps) => {
              setOpen(false);
              navigate(`/products/${item.id}`);
              console.log("clicked item");
            }}
            onClose={() => setOpen(false)}
            // 필요 시 검색어 하이라이트, 빈상태 텍스트 등 옵션도 전달
          />
        </div>
      )}
    </div>
  );
}

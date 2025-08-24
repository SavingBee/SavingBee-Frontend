import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//컴포넌트
import ProductList from "@/components/product/ProductList";
import Pagination from "@/components/common/Pagination";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import SearchForm from "@/components/search/SearchForm";

//검색관련
import type { Product, SearchResponse } from "@/types/search";
import { searchProducts } from "@/api/search";

// 필터관련
import FilterBar from "@/components/filter/FilterBar";
import SelectedFilter from "@/components/filter/SelectedFilter";
import { useFilterChips } from "@/hooks/filter/useFilterChips";
import { useSearchQuery } from "@/hooks/filter/useSearchQuery";
import { useQueryParams } from "@/hooks/filter/useQueryParams";

//리스트 api 키 맵핑
import { mapListKeys } from "@/utils/listKeyMap";

//적금전용
import { useSavingsFilterState } from "@/hooks/filter/useSavingsFilterState";
import { SAVING_FILTERS } from "@/components/filter/dropdown/config";

const SavingsPage = () => {
  const sampleProducts = [
    {
      fin_prdt_cd: "WR0001A",
      fin_prdt_nm: "우리웰리치 주거래예금",
      kor_co_nm: "우리은행",
      product_type: "deposit",
      max_intr_rate: 2.25,
      base_intr_rate: 2.0,
      logo_url: "/images/banks/woori.png",
    },
    {
      fin_prdt_cd: "SH0001S",
      fin_prdt_nm: "신한 청년적금",
      kor_co_nm: "신한은행",
      product_type: "savings",
      max_intr_rate: 2.9,
      base_intr_rate: 2.5,
    },
  ];
  const samplePopularProducts = [
    {
      fin_prdt_cd: "KB0001A",
      fin_prdt_nm: "KB Star 정기예금",
      kor_co_nm: "KB국민은행",
      product_type: "deposit",
      max_intr_rate: 3.1,
      base_intr_rate: 2.8,
    },
    {
      fin_prdt_cd: "SH0001S",
      fin_prdt_nm: "신한 청년적금",
      kor_co_nm: "신한은행",
      product_type: "savings",
      max_intr_rate: 2.9,
      base_intr_rate: 2.6,
    },
    {
      fin_prdt_cd: "NH0001D",
      fin_prdt_nm: "NH올원 예금",
      kor_co_nm: "농협은행",
      product_type: "deposit",
      max_intr_rate: 2.8,
      base_intr_rate: 2.5,
    },
  ];

  // 페이지 로드 시 API 호출 (MSW)
  // useEffect(() => {
  //   fetch("/api/savings")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((err) => console.error("API Error:", err));
  // }, []);

  // const [filter, setFilter] = useState<SavingsFilter>(initial);

  const navigate = useNavigate();
  const { q, applySearch } = useSearchQuery(); //검색 훅
  const { apply } = useQueryParams(["q"]); //필터 훅

  // 화면 상태
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [isPopular, setIsPopular] = useState(false);
  const [page, setPage] = useState(1);

  // UI 상태
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>("");

  //새로고침 - url 리셋
  useEffect(() => {
    if (location.search) navigate({ search: "" }, { replace: true });
  }, []);
  /***********************************************
   *
   * 검색어 있을때 API 요청
   * 만족 값 없으면 --> popularProducts (추천상품)
   *
   *
   ************************************************/

  //검색 API 호출
  useEffect(() => {
    setKeyword(q);
    if (!q) {
      setItems([]);
      setIsPopular(false);
      return;
    }
    searchProducts(q).then((res: SearchResponse) => {
      const list =
        res.products && res.products.length > 0
          ? res.products
          : "popularProducts" in res
            ? res.popularProducts
            : [];
      setItems(list);
      setIsPopular(!(res.products && res.products.length > 0));
    });
  }, [q]);

  /**
   * 적금 전용 --- 필터 이름 맵핑
   */

  const onConfirmFilter = (snapshot: any) => {
    const flat: Record<string, string | number> = {
      ...mapListKeys(snapshot.lists), // finCoType, joinWay, ...
    };

    // 금리 범위(공통)
    if (typeof snapshot.baseRateMin === "number")
      flat.intrRateMin = snapshot.baseRateMin;
    if (typeof snapshot.baseRateMax === "number")
      flat.intrRateMax = snapshot.baseRateMax;
    if (typeof snapshot.maxRateMin === "number")
      flat.intrRate2Min = snapshot.maxRateMin;
    if (typeof snapshot.maxRateMax === "number")
      flat.intrRate2Max = snapshot.maxRateMax;

    // 적금 전용(단일 값)
    if (typeof snapshot.monthlyAmount === "number")
      flat.monthlyMaxLimit = snapshot.monthlyAmount;
    if (typeof snapshot.totalAmountMax === "number")
      flat.totalMaxLimit = snapshot.totalAmountMax;

    // 예금 전용(가입한도 범위)
    // if (typeof snapshot.totalAmountMin === "number")
    //   flat.maxLimitMin = snapshot.totalAmountMin;
    // if (typeof snapshot.totalAmountMax === "number")
    //   flat.maxLimitMax = snapshot.totalAmountMax;

    apply(flat); // URL 쿼리 갱신(q 유지, page=1 리셋)
  };

  /**
   * 필터 상태관리
   */
  const {
    selected,
    setSelected,
    amount,
    setAmount,
    monthlyAmount,
    setMonthlyAmount,
    baseRate,
    setBaseRate,
    maxRate,
    setMaxRate,
    totalAmount,
    setTotalAmount,
  } = useSavingsFilterState();
  const filterState = {
    selected,
    amount,
    monthlyAmount,
    baseRate,
    maxRate,
    totalAmount,
  };
  const filterSetters = {
    setSelected,
    setAmount,
    setMonthlyAmount,
    setBaseRate,
    setMaxRate,
    setTotalAmount,
  };

  /**
   * selected chips 상태관리   ------ 예금, 적금 모드 분리
   * hook > filter > useFilterChips.tsx
   */
  const { chips } = useFilterChips({
    mode: "saving",
    selected,
    setSelected,
    amount,
    setAmount,
    monthlyAmount,
    setMonthlyAmount,
    baseRate,
    setBaseRate,
    maxRate,
    setMaxRate,
    totalAmount,
    setTotalAmount,
  });
  /**
   * *** 레이아웃
   * 전체: min-h-screen
   * main: flex-1
   */
  return (
    <div className="flex flex-col  ">
      {/* <p className="text-center my-4">메인검색화면</p> */}
      <PageHeader
        title="적금상품"
        breadcrumb={[
          {
            label: "홈",
            to: "/", // to 없으면 마지막 active
          },
          {
            label: "상품검색",
            to: "/",
          },
          {
            label: "적금",
          },
        ]}
      />
      <SearchForm
        value={keyword}
        onChange={setKeyword}
        onSubmit={applySearch}
        placeholder="상품명을 검색하세요?!!!!"
      />

      <FilterBar
        filters={SAVING_FILTERS}
        state={filterState}
        actions={filterSetters}
        onConfirm={onConfirmFilter}
      />

      {/* 칩삭제시 urlSearchParams 변경 */}
      <SelectedFilter chips={chips} />

      {/* 제품이 있는경우, 없는 경우 분리 */}

      {/* API 이후 테스트 */}
      {/* <main>
        {items.length > 0 ? (
          <>
            {isPopular && (
              <div className="pb-3">
                {" "}
                <h3 className="mt-2 text-lg font-semibold">추천상품</h3>{" "}
                <p className="text-sm text-gray-500">
                  검색 결과가 없어 인기 상품을 추천합니다{" "}
                </p>
              </div>
            )}
            <ProductList
              items={items}
              onCompare={(id) => console.log("비교함 담기:", id)}
            />
          </>
        ) : (
          q && <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
        )}{" "}
      </main> */}
      <main>
        {sampleProducts.length > 0 ? (
          <ProductList
            items={sampleProducts}
            onCompare={(id) => console.log("비교함 담기:", id)}
          />
        ) : (
          <>
            <div className="pb-3">
              <h3 className="mt-2 text-lg font-semibold">추천상품</h3>
              <p className="text-sm text-gray-500">
                검색 결과가 없어 인기 상품을 추천합니다
              </p>
            </div>
            <ProductList
              items={samplePopularProducts}
              onCompare={(id) => console.log("비교함 담기:", id)}
            />{" "}
          </>
        )}
      </main>
      <h5>현재 페이지: {page}</h5>
      <Pagination
        totalPages={100}
        currentPage={page}
        onChange={(next) => {
          setPage(next);
          // ?page=next 로 URL 업데이트 + API 호출
        }}
        //디자인 추가 변경 가능
        className="my-8"
      />
    </div>
  );
};

export default SavingsPage;

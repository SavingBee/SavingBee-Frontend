import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//컴포넌트
import ProductList from "@/components/product/ProductList";
import Pagination from "@/components/common/Pagination";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import SearchForm from "@/components/search/SearchForm";

//검색, 필터 -> api
// import type { Product, SearchResponse } from "@/types/search";
// import { searchProducts } from "@/api/search";
// import type { SavingsListResponse, SavingsListParams } from "@/api/savings";
import { fetchDepositList } from "@/api/deposit";

// 필터관련
import FilterBar from "@/components/filter/FilterBar";
import SelectedFilter from "@/components/filter/SelectedFilter";
import { useFilterChips } from "@/hooks/filter/useFilterChips";
import { useSearchQuery } from "@/hooks/filter/useSearchQuery";
import { useQueryParams } from "@/hooks/filter/useQueryParams";

//리스트 api 키 맵핑
import { mapListKeys } from "@/utils/listKeyMap";

//예금전용
import { useDepositFilterState } from "@/hooks/filter/useDepositFilterState";
import { DEPOSIT_FILTERS } from "@/components/filter/dropdown/config";

const DepositPage = () => {
  // 페이지 로드 시 API 호출 (MSW)
  // useEffect(() => {
  //   fetch("/api/savings")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //     })
  //     .catch((err) => console.error("API Error:", err));
  // }, []);

  const navigate = useNavigate();
  const { q, applySearch } = useSearchQuery(); //검색 훅
  const { apply } = useQueryParams(["q"]); //필터 훅

  // 화면 상태
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [isPopular, _setIsPopular] = useState(false);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [_loading, setLoading] = useState(false);
  const [_error, setError] = useState("");

  //새로고침 - url 리셋
  useEffect(() => {
    if (location.search) navigate({ search: "" }, { replace: true });
  }, []);
  /***********************************************
   *
   * 필터 API 요청  (fetchSavingsList)-> 검색어, 필터 입력시 동일 API 호출
   * 만족 값 없으면 --> popularProducts (추천상품)
   *
   *
   ************************************************/

  const location = useLocation();
  useEffect(() => {
    const sp = new URLSearchParams(location.search);

    const params = Object.fromEntries(sp.entries()); // 전부 문자열

    //파라미터 테스트
    console.log("[URL qs]", sp.toString());
    console.log("[API params]", params);

    setLoading(true);
    setError("");

    fetchDepositList(params as any)
      .then((data) => {
        // console.log("[API raw]", data);
        setItems(data.content ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotalData(data.totalElements ?? "");
      })
      .catch((e: any) => {
        setItems([]);
        setTotalPages(1);
        setError(e?.response?.data?.message || e?.message || "목록 조회 실패");
      })
      .finally(() => setLoading(false));
  }, [location.search]);
  useEffect(() => {
    console.log("[items changed]", items);
  }, [items]);

  //검색 API 호출
  // useEffect(() => {
  //   setKeyword(q);
  //   if (!q) {
  //     setItems([]);
  //     setIsPopular(false);
  //     return;
  //   }
  //   fetchSavingsList(q).then((res: SavingsListResponse) => {
  //     const list =
  //       res.products && res.products.length > 0
  //         ? res.products
  //         : "popularProducts" in res
  //           ? res.popularProducts
  //           : [];
  //     setItems(list);
  //     setIsPopular(!(res.products && res.products.length > 0));
  //   });
  // }, [q]);

  /**
   * 예금 전용 --- 필터 이름 맵핑  (number 관련)
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

    // 적금 전용(단일 값  -- 월 저축금, 총 저축금)
    // if (typeof snapshot.monthlyAmount === "number")
    //   flat.monthlyMaxLimit = snapshot.monthlyAmount;
    // if (typeof snapshot.totalAmountMax === "number")
    //   flat.totalMaxLimit = snapshot.totalAmountMax;

    // 예금 전용(가입한도 범위-최소,최대)
    if (typeof snapshot.totalAmountMin === "number")
      flat.maxLimitMin = snapshot.totalAmountMin;
    if (typeof snapshot.totalAmountMax === "number")
      flat.maxLimitMax = snapshot.totalAmountMax;

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
    baseRate,
    setBaseRate,
    maxRate,
    setMaxRate,
    totalAmount,
    setTotalAmount,
  } = useDepositFilterState();
  const filterState = {
    selected,
    amount,
    baseRate,
    maxRate,
    totalAmount,
  };
  const filterSetters = {
    setSelected,
    setAmount,
    setBaseRate,
    setMaxRate,
    setTotalAmount,
  };

  /**
   * selected chips 상태관리   ------ 예금, 적금 모드 분리
   * hook > filter > useFilterChips.tsx
   */
  const { chips } = useFilterChips({
    mode: "deposit",
    selected,
    setSelected,
    amount,
    setAmount,

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
        title="예금상품"
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
            label: "예금",
          },
        ]}
      />
      <SearchForm
        value={keyword}
        onChange={setKeyword}
        onSubmit={applySearch}
        placeholder="상품명을 입력해주세요"
      />

      <FilterBar
        filters={DEPOSIT_FILTERS}
        state={filterState}
        actions={filterSetters}
        onConfirm={onConfirmFilter}
      />

      {/* 칩삭제시 urlSearchParams 변경 */}
      <SelectedFilter chips={chips} />

      {/* 제품이 있는경우, 없는 경우 분리 */}

      <p className="mb-2 mt-6">
        총 <span className="text-primary font-bold">{totalData}</span>건
      </p>
      {/* API 이후 테스트 */}
      <main>
        {items.length > 0 ? (
          <>
            {isPopular && (
              <div className="pb-3">
                <h3 className="mt-2 text-lg font-semibold">추천상품</h3>{" "}
                <p className="text-sm text-gray-500">
                  검색 결과가 없어 인기 상품을 추천합니다
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
        )}
      </main>
      {/* <main>
        {sampleProducts.length > 0 ? (
          <ProductList
            // items={sampleProducts}
            items={items}
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
      </main> */}
      {/* <h5>현재 페이지: {page}</h5> */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onChange={(next) => {
          setPage(next);
          const sp = new URLSearchParams(location.search);
          // ?page=next 로 URL 업데이트 + API 호출
          sp.set("page", String(next));
          navigate({ search: "?" + sp.toString() }, { replace: false });
        }}
        //디자인 추가 변경 가능
        className="my-8"
      />
    </div>
  );
};

export default DepositPage;

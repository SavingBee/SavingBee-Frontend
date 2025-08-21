import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import ProductList from "@/components/product/ProductList";
import Pagination from "@/components/common/Pagination";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import { ListCategory } from "@/types/searchFilter";
import SearchForm from "@/components/search/SearchForm";

// 필터관련
// import SavingsFilterBar from "@/components/filter/SavingsFilterBar";
import FilterBar_hk from "@/components/filter/FilterBar_hk";
import SelectedFilter from "@/components/filter/SelectedFilter";
import { OPTION_MAP } from "@/components/filter/dropdown/config";
import { buildQuery } from "@/utils/query";
// import type { SavingsFilter } from "@/types/search";
// import FilterBar_hk from "@/components/filter/FilterBar_hk";

//products 전역 데이터
// import { products } from "@/store/Store";

// const initial: SavingsFilter = {
//   keyword: "",
//   bankType: [],
//   benefit: [],
//   target: [],
//   term: [],
//   interestType: undefined,
//   rsrvType: undefined,
//   monthlyAmountMin: undefined,
//   monthlyAmountMax: undefined,
//   baseRateMin: undefined,
//   baseRateMax: undefined,
//   maxRateMin: undefined,
//   maxRateMax: undefined,
//   sort: "maxRateDesc",
//   page: 1,
//   pageSize: 20,
// };

/**
 * 타입정의
 */
type RangeState = { min?: number; max?: number };
type Selected = {
  bankType: string[];
  benefit: string[];
  target: string[];
  term: string[];
  interestType: string[];
  rsrvType: string[];
};

const SavingsPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]); // 초기값 빈 배열

  // 페이지 로드 시 API 호출 (MSW)
  useEffect(() => {
    fetch("/api/savings")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  // const [filter, setFilter] = useState<SavingsFilter>(initial);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    const qs = buildQuery(filter);
    const res = await fetch(`/api/savings?${qs}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
    // 필요하면 window.history.replaceState(null, "", `?${qs}`) 로 URL도 맞출 수 있음
  };

  const handleReset = () => {
    // setFilter(initial);
    setItems([]); // 선택
  };

  const copyShareLink = async () => {
    // 백엔드가 단축링크 제공한다고 했으니, 예: /api/shorten?{현재쿼리}
    const qs = buildQuery(filter);
    const res = await fetch(`/api/shorten?${qs}`);
    const { shortUrl } = await res.json();
    await navigator.clipboard.writeText(shortUrl);
    alert("공유 링크를 복사했어요!");
  };

  // const products = [
  //   {
  //     id: "1",
  //     logoUrl: "/banks/sh.png",
  //     productName: "Sh첫만남우대예금",
  //     bankName: "SH수협은행",
  //     promoRate: 2.9,
  //     baseRate: 1.85,
  //     description: "신규 우대",
  //   },
  //   {
  //     id: "2",
  //     logoUrl: "/banks/kb.png",
  //     productName: "KB Star 정기적금",
  //     bankName: "KB국민은행",
  //     promoRate: 3.2,
  //     baseRate: 2.0,
  //     description: "비대면 가입",
  //   },
  // ];

  /**
   * FilterBar에서 데이터가 들어오면 parameter 반영 작업
   */
  const handleConfirm = useCallback(
    (nf: {
      lists: Record<ListCategory, string[]>;
      amount?: number;
      monthlyAmount?: number;
      baseRateMin?: number;
      baseRateMax?: number;
      maxRateMin?: number;
      maxRateMax?: number;
      totalAmountMin?: number;
      totalAmountMax?: number;
    }) => {
      // 페이지는 항상 1로 리셋
      setPage(1);

      // (선택) 로컬 상태를 맞춰두고 싶으면 유지, 이미 FilterBar가 커밋했으니 생략 가능

      // 쿼리스트링 만들기 (배열은 반복 키로 append)
      const sp = new URLSearchParams();

      // const trimQ = (searchQuery || "").trim();
      // if (trimQ) sp.set("q", trimQ);

      // sp.set("sort", sort);
      sp.set("page", "1");

      // 리스트 카테고리들: bankType, benefit, target, term, interestType, rsrvType 등
      Object.entries(nf.lists).forEach(([key, arr]) => {
        if (Array.isArray(arr) && arr.length > 0) {
          arr.forEach((v) => sp.append(key, String(v)));
        }
      });

      // 숫자/범위 값 유틸
      const setNum = (k: string, v: unknown) => {
        if (v === 0 || (typeof v === "number" && !Number.isNaN(v))) {
          sp.set(k, String(v));
        }
      };

      setNum("amount", nf.amount);
      setNum("monthlyAmount", nf.monthlyAmount);
      setNum("baseRateMin", nf.baseRateMin);
      setNum("baseRateMax", nf.baseRateMax);
      setNum("maxRateMin", nf.maxRateMin);
      setNum("maxRateMax", nf.maxRateMax);
      setNum("totalAmountMin", nf.totalAmountMin);
      setNum("totalAmountMax", nf.totalAmountMax);

      navigate({ search: `?${sp.toString()}` }, { replace: true });
      // 히스토리 덮어쓰기(뒤로가기는 이전 '페이지'로만 이동)
      // setSearchParams(sp, { replace: true });
    },
    [],
    // [searchQuery, sort, setSearchParams],
  );

  /**
   * 필터내용
   */
  // 리스트형 필터
  const [selected, setSelected] = useState<Selected>({
    bankType: [],
    benefit: [],
    target: [],
    term: [],
    interestType: [],
    rsrvType: [],
  });

  // 숫자/범위형 필터
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [monthlyAmount, setMonthlyAmount] = useState<number | undefined>(
    undefined,
  );
  const [baseRate, setBaseRate] = useState<RangeState>({});
  const [maxRate, setMaxRate] = useState<RangeState>({});
  const [totalAmount, setTotalAmount] = useState<RangeState>({});

  /**
   * selected chips
   */
  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  //리스트 선택 배지
  (Object.keys(selected) as ListCategory[]).forEach((cat) => {
    selected[cat].forEach((id) => {
      const label = OPTION_MAP[cat].find((o) => o.id === id)?.text ?? id;
      chips.push({
        key: `${cat}:${id}`,
        label,
        onRemove: () =>
          setSelected((prev) => ({
            ...prev,
            [cat]: prev[cat].filter((v) => v !== id),
          })),
      });
    });
  });

  if (typeof amount === "number") {
    chips.push({
      key: "amount",
      label: `저축금: ${amount.toLocaleString()}원`,
      onRemove: () => setAmount(undefined),
    });
  }

  if (baseRate.min !== undefined || baseRate.max !== undefined) {
    const a = baseRate.min ?? "최저값";
    const b = baseRate.max ?? "최고값";
    chips.push({
      key: "baseRate",
      label: `기본금리: ${a} ~ ${b}`,
      onRemove: () => setBaseRate({}),
    });
  }
  if (maxRate.min !== undefined || maxRate.max !== undefined) {
    const a = maxRate.min ?? "최저값";
    const b = maxRate.max ?? "최고값";
    chips.push({
      key: "maxRate",
      label: `최고금리: ${a} ~ ${b}`,
      onRemove: () => setMaxRate({}),
    });
  }
  if (typeof monthlyAmount === "number") {
    chips.push({
      key: "monthlyAmount",
      label: `월저축금: ${monthlyAmount.toLocaleString()}원`,
      onRemove: () => setMonthlyAmount(undefined),
    });
  }

  if (totalAmount.min !== undefined || totalAmount.max !== undefined) {
    const a = totalAmount.min
      ? `${totalAmount.min.toLocaleString()}원`
      : "최저값";
    const b = totalAmount.max
      ? `${totalAmount.max.toLocaleString()}원`
      : "최고값";
    chips.push({
      key: "totalAmount",
      label: `총저축금: ${a} ~ ${b}`,
      onRemove: () => setTotalAmount({}),
    });
  }
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
      <SearchForm />

      {/* 필터 */}
      {/* <SavingsFilterBar
        value={filter}
        onChange={(next) =>
          setFilter((prev) => ({ ...prev, ...next, page: 1 }))
        }
        onApply={handleApply}
        onReset={handleReset}
      /> */}
      {/* <FilterBar_hk /> */}
      <FilterBar_hk
        selected={selected}
        setSelected={setSelected}
        amount={amount}
        setAmount={setAmount}
        baseRate={baseRate}
        setBaseRate={setBaseRate}
        maxRate={maxRate}
        setMaxRate={setMaxRate}
        monthlyAmount={monthlyAmount}
        setMonthlyAmount={setMonthlyAmount}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        //queryParam 관련
        onConfirm={handleConfirm}
      />
      <SelectedFilter chips={chips} />
      <main>
        <ProductList
          items={products}
          onCompare={(id) => console.log("비교함 담기:", id)}
        />
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

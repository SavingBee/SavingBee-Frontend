import { useState, useEffect } from "react";
import ProductList from "@/components/product/ProductList";
import Pagination from "@/components/common/Pagination";
import PageHeader from "@/components/common/pageHeader/PageHeader";
// 필터관련
import FilterBar from "@/components/search/FilterBar";
import SelectedFilter from "@/components/search/SelectedFilter";

//products 전역 데이터
// import { products } from "@/store/Store";

const SavingsPage = () => {
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

      {/* 필터 */}
      <FilterBar />
      <SelectedFilter />
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

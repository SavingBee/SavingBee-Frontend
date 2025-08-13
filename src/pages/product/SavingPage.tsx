import { useState } from "react";
import ProductList from "@/components/product/ProductList";
import Pagination from "@/components/common/Pagination";
import PageHeader from "@/components/common/pageHeader/PageHeader";

//products 전역 데이터
// import { products } from "@/store/Store";

const SavingPage = () => {
  const [page, setPage] = useState(1);

  const products = [
    {
      id: "1",
      logoUrl: "/banks/sh.png",
      productName: "Sh첫만남우대예금",
      bankName: "SH수협은행",
      promoRate: 2.9,
      baseRate: 1.85,
      description: "신규 우대",
    },
    {
      id: "2",
      logoUrl: "/banks/kb.png",
      productName: "KB Star 정기적금",
      bankName: "KB국민은행",
      promoRate: 3.2,
      baseRate: 2.0,
      description: "비대면 가입",
    },
  ];

  /**
   * *** 레이아웃
   * 전체: min-h-screen
   * main: flex-1
   */
  return (
    <div className="px-4 flex flex-col  ">
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

export default SavingPage;

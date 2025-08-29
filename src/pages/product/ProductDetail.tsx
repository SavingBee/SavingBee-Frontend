import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/pageHeader/PageHeader";
import ProductDetailHero from "@/components/product/productDetail/ProductDetailHero";
import ExpandableInfo from "@/components/product/productDetail/ExpandableInfo";
import BranchMap from "@/components/product/productDetail/BranchMap";

//api
import { getProductDetail } from "@/api/productDetail";
import type { ProductType, ProductDetail } from "@/types/productDetail";

function fmtYMD(v?: string | null) {
  if (!v) return "상시";
  if (v.length === 8)
    return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
  return v;
}
const ProductDetail = () => {
  //리스트 클릭 -> 해당 제품 정보

  // 임시 products 데이터
  // const products = [
  //   {
  //     id: "sh-1001",
  //     bankName: "SH수협은행",
  //     productName: "Sh첫만남우대예금",
  //     baseRate: 2.0,
  //     maxRate: 2.56,
  //   },
  //   {
  //     id: "kb-2001",
  //     bankName: "KB국민은행",
  //     productName: "국민 첫거래 예금",
  //     baseRate: 0.018,
  //     maxRate: 2.0,
  //   },
  // ];

  const { productId } = useParams<{ productId: string }>();
  const [productType, setProductType] = useState<ProductType | "">("");

  const [data, setData] = useState<ProductDetail | null>(null);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    setData(null);

    if (!productId) {
      setError("잘못된 접근입니다. productId가 없습니다.");
      setLoading(false);
      return;
    }

    getProductDetail(productId)
      .then((data) => {
        if (!alive) return;
        setData(data);
        setProductType(data.product_type);
        // console.log(data);
      })
      .catch((e: any) => {
        if (!alive) return;
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "상품 상세 조회에 실패했습니다.";
        setError(msg);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [productId]);

  const infoPairs = useMemo(() => {
    if (!data) return [];
    return [
      { label: "공시 시작일", value: fmtYMD(data.dcls_strt_day) },
      {
        label: "공시 종료일",
        value: data.dcls_end_day ? fmtYMD(data.dcls_end_day) : "상시",
      },
      { label: "금융 회사명", value: data.kor_co_nm },
      { label: "금융 상품명", value: data.fin_prdt_nm },
      { label: "가입대상", value: data.join_member },
      { label: "가입제한", value: data.join_deny_nm },
      { label: "가입경로", value: data.join_way },
      {
        label: "가입한도",
        value:
          data.max_limit != null
            ? `${data.max_limit.toLocaleString()}원`
            : "한도 없음",
      },
      { label: "우대조건", value: data.spcl_cnd || "해당 없음" },
      { label: "만기후이자", value: data.mtrt_int || "정보 없음" },
      { label: "비고", value: data.etc_note || "해당 없음" },
    ];
  }, [data]);

  return (
    <div className="flex flex-col  ">
      <PageHeader
        breadcrumb={[
          {
            label: "홈",
            to: "/", // to 없으면 마지막 active
          },
          {
            label: productType === "saving" ? "적금검색" : "예금검색",
            to: productType === "saving" ? "/savings" : "/deposit",
          },
          {
            label: productType === "saving" ? "적금상세" : "예금상세",
          },
        ]}
      />
      {/* 객체 통으로 넘기기 */}
      {/* product={data} */}
      {data && <ProductDetailHero product={data} />}
      <ExpandableInfo title="상품 안내" pairs={infoPairs} initialVisible={5} />
      {/* branches={[]} */}
      <BranchMap title="영업점 안내" />
    </div>
  );
};

export default ProductDetail;

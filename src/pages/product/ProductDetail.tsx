import PageHeader from "@/components/common/pageHeader/PageHeader";
import ProductDetailHero from "@/components/product/productDetail/ProductDetailHero";
import ExpandableInfo from "@/components/product/productDetail/ExpandableInfo";
import type { ProductDetail } from "@/types/productDetail";
import BranchMap from "@/components/product/productDetail/BranchMap";

const ProductDetail = () => {
  //리스트 클릭 -> 해당 제품 정보

  //API 호출
  //const [data, setData] = useState<ProductDetail | null>(null);

  // useEffect(() => {
  //   fetch(`/api/products/${id}`)
  //     .then(res => res.json())
  //     .then((json: ProductDetail) => setData(json));
  // }, [id]);

  // 임시 products 데이터
  const products = [
    {
      id: "sh-1001",
      bankName: "SH수협은행",
      productName: "Sh첫만남우대예금",
      baseRate: 2.0,
      maxRate: 2.56,
    },
    {
      id: "kb-2001",
      bankName: "KB국민은행",
      productName: "국민 첫거래 예금",
      baseRate: 0.018,
      maxRate: 2.0,
    },
  ];

  //`${data.periodMonths}개월`
  const infoPairs = [
    { label: "공시제", value: "2025년 8월" },
    { label: "금융회사명", value: "신한은행" },
    { label: "금융상품명", value: "첫만남우대" },
    { label: "저축기간", value: `12개월` },
    { label: "이자율 유형", value: "고정금리" },
    //
    { label: "이자율 유형", value: "고정금리" },
    { label: "이자율 유형", value: "고정금리" },
    { label: "이자율 유형", value: "고정금리" },
  ];

  // 첫상품
  const product = products[0];
  // if (!data) return <div>Loading...</div>;
  return (
    <div className="flex flex-col  ">
      {/* <p className="text-center my-4">메인검색화면</p> */}
      <PageHeader
        // title="적금상품"
        breadcrumb={[
          {
            label: "홈",
            to: "/", // to 없으면 마지막 active
          },
          {
            label: "적금검색",
            to: "/savings",
          },
          {
            label: "적금이름",
          },
        ]}
      />
      {/* 객체 통으로 넘기기 */}
      {/* product={data} */}
      <ProductDetailHero product={product} />
      <ExpandableInfo title="상품 안내" pairs={infoPairs} initialVisible={5} />
      <BranchMap title="영업점 안내" branches="" />
    </div>
  );
};

export default ProductDetail;

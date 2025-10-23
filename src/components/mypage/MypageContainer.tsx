import useMyProfile from "@/hooks/mypage/useMyProfile";
import PageHeader from "../common/pageHeader/PageHeader";
import UserHeader from "./UserHeader";
import UserProductList from "./products/UserProductList";

import { HiPlusSm } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useMyProductStore";
import { useEffect } from "react";
const MypageContainer = () => {
  // 회원정보 가져오기
  const { data: profile } = useMyProfile();

  // Zustand 상태 가져오기
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  // 최초 1회 상품 데이터 가져오기
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <PageHeader
        title="마이페이지"
        breadcrumb={[
          { label: "홈", to: "/" },
          { label: "마이페이지", to: "/mypage" },
        ]}
      />
      <UserHeader profile={profile} products={products} />
      <div className="flex justify-between items-center mt-9">
        <strong className="gmarket font-bold text-2xl">
          <span className="text-primary">{profile?.nickname}</span>님의 보유상품
        </strong>
        <Link
          to="/mypage/product/form"
          className="flex items-center gap-1 py-2 px-3 font-bold text-sm bg-primary text-white rounded-md"
        >
          <HiPlusSm size={20} />
          보유 상품 추가
        </Link>
      </div>
      <div className="mt-3">
        <UserProductList products={products} />
      </div>
    </div>
  );
};
export default MypageContainer;

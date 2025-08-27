import PageHeader from "../common/pageHeader/PageHeader";
import UserHeader from "./UserHeader";
import UserProductList from "./products/UserProductList";
import RecommendList from "./recommend/RecommendList";

const MypageContainer = () => {
  return (
    <div>
      <PageHeader
        title="마이페이지"
        breadcrumb={[
          { label: "홈", to: "/" },
          { label: "마이페이지", to: "/mypage" },
        ]}
      />
      <UserHeader />
      <div className="mt-9">
        <strong className="gmarket font-bold text-2xl">
          Nickname을 위한 <span className="text-primary">추천 상품</span>
        </strong>
      </div>

      <UserProductList />
      <RecommendList />
    </div>
  );
};
export default MypageContainer;

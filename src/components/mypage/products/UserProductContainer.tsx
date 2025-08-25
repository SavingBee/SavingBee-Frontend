import PageHeader from "@/components/common/pageHeader/PageHeader";
import UserProductDetail from "./UserProductDetail";

const UserProductContainer = () => {
    return (
        <div>
            <PageHeader
                title="보유 상품"
                breadcrumb={[
                    { label: "홈", to: "/" },
                    { label: "마이페이지", to: "/mypage" },
                    { label: "보유 상품", to: "/mypage/recommend" }
                ]}
            />
            <UserProductDetail />
        </div>
    )
}
export default UserProductContainer;
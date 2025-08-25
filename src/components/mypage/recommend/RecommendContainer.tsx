import PageHeader from "@/components/common/pageHeader/PageHeader";
import RecommendDetail from "./RecommendDetail";

const RecommendContainer = () => {
    return (
        <div>
            <PageHeader
                title="마이페이지"
                breadcrumb={[
                    { label: "홈", to: "/" },
                    { label: "마이페이지", to: "/mypage" },
                    { label: "추천상품", to: "/mypage/recommend" }
                ]}
            />
            <RecommendDetail />
        </div>
    )
}
export default RecommendContainer;
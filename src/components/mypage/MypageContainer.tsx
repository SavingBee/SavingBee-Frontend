import { useState } from "react";
import PageHeader from "../common/pageHeader/PageHeader";
import UserHeader from "./UserHeader";
import Button from "../common/button/Button";
import UserEditModal from "./UserEditModal";

const MypageContainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <PageHeader
                title="마이페이지"
                breadcrumb={[
                    { label: "홈", to: "/" },
                    { label: "마이페이지", to: "/mypage" }
                ]}
            />
            <div className="flex justify-end mb-2">
                <Button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    variant="sm"
                    styleVariant="border"
                    className="font-medium"
                >
                    회원정보수정
                </Button>
                <UserEditModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
            <UserHeader />
            <div className="mt-9">
                <strong className="gmarket font-bold text-2xl">
                    Nickname을 위한 <span className="text-primary">추천 상품</span>
                </strong>
            </div>
        </div>
    )
}
export default MypageContainer;
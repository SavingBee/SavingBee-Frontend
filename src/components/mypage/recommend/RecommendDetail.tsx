import { FaStar } from "react-icons/fa";

const RecommendDetail = () => {
    return (
        <div>
            <div className="flex items-center gap-5 py-6 border-t border-b border-graye5">
                <div className="flex items-center justify-center w-[74px] h-[74px] bg-lightPrimary border border-[#E4ECF5] rounded-full">
                    <FaStar size={30} color="#1976D3" />
                </div>
                <div>
                    <strong className="block gmarket text-xl text-primary">연간 100,000원 더 받을 수 있어요!</strong>
                    <p className="text-sm text-black6">현재 상품보다 1% 높은 금리로 더 많은 이자를 받아보세요!</p>
                </div>
            </div>
        </div>
    )
}
export default RecommendDetail;
import { Link } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
    return (
        <div
            id="mobile-menu"
            className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black/30
                        ${open ? "visible z-30" : "invisible z-[-30]"}`}
        >
            <div className={`absolute top-0 right-0 max-w-[300px] w-full h-full bg-white transition-[right] duration-300
                            ${open ? "right-0" : "right-[-300px]"}`}
            >
                {/* 닫기 버튼 */}
                <button
                    type="button"
                    className="absolute top-[20px] right-[20px] block"
                    onClick={onClose}
                >
                    <IoClose size={24} color="white" />
                </button>
                <div className="bg-primary px-[20px] py-[25px]">
                    <Link to="/"
                        className="flex items-center gap-1 gmarket font-bold text-white"
                    >
                        로그인 해주세요
                        <MdArrowForwardIos size={14} />
                    </Link>
                    <p className="text-xs font-medium text-white mt-1">로그인하여 더 편리하게 혜택을 누리세요!</p>
                </div>
                <ul className="">
                    <li><Link to="/" className="block w-full py-[18px] px-[20px] font-medium text-sm border-b border-graye9">상품검색</Link></li>
                    <li><Link to="/" className="block w-full py-[18px] px-[20px] font-medium text-sm border-b border-graye9">상품비교</Link></li>
                    <li><Link to="/" className="block w-full py-[18px] px-[20px] font-medium text-sm border-b border-graye9">상품추천</Link></li>
                    <li><Link to="/" className="block w-full py-[18px] px-[20px] font-medium text-sm border-b border-graye9">인근 영업점</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default MobileMenu;
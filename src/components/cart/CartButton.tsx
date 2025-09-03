import useAuthHeader from "@/hooks/auth/useAuthHeader";
import useCartList from "@/hooks/cart/useCartList";
import { CartItem } from "@/types/cart";
import { FaInbox } from "react-icons/fa6";

type CartButtonProps = {
    onClick: () => void;
};

const CartButton = ({ onClick }: CartButtonProps) => {
    // 로그인 여부 확인
    const isLoggedIn = useAuthHeader();

    const { data } = useCartList({ page: 0, size: 10 });
    // localStorage에서 비교함 데이터 가져오기
    const existing = localStorage.getItem("compareCart");
    const localItems: CartItem[] = existing ? JSON.parse(existing) : [];

    const count = isLoggedIn ? data?.content.length : localItems.length;

    return (
        <div>
            <span
                className="absolute top-0 left-0 flex items-center justify-center w-[20px] h-[20px] font-bold text-xs text-white bg-primary border-[2px] border-white rounded-full"
            >
                {count}
            </span>
            <button
                onClick={onClick}
                className="flex items-center justify-center w-[55px] h-[55px] bg-primary rounded-full"
            >
                <FaInbox size={23} color="#fff" />
            </button>
        </div>
    )
}
export default CartButton;
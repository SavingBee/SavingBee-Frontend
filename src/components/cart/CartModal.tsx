import useAuthHeader from "@/hooks/auth/useAuthHeader";
import useCartList from "@/hooks/cart/useCartList";
import { useClearCart } from "@/hooks/cart/useClearCart";
import { useDeleteCartItem } from "@/hooks/cart/useDeleteCartItem";
import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type CartModalProps = {
    onClose: () => void;
};

const CartModal = ({ onClose }: CartModalProps) => {
    // 로그인 여부
    const isLoggedIn = useAuthHeader();

    // 비회원
    const [localItems, setLocalItems] = useState<CartItem[]>([]);

    const { data, reload } = useCartList({ page: 0, size: 999 });
    const { remove } = useDeleteCartItem();
    const { removeAll } = useClearCart();

    const apiItems = data?.content || [];

    // 비회원 localStorage 관리
    useEffect(() => {
        if (!isLoggedIn) {
            const raw = localStorage.getItem("compareCart");
            const parsed = raw ? JSON.parse(raw) : [];
            setLocalItems(parsed);
        }
    }, [isLoggedIn]);


    const handleDelete = (cartId: number) => {
        const ok = window.confirm("해당 상품을 보관함에서 삭제할까요?");
        if (!ok) return;

        if (isLoggedIn) {
            remove(cartId, () => {
                reload();
                alert("삭제되었습니다.");
            });
        } else {
            const updated = localItems.filter((item) => item.cartId !== cartId);
            setLocalItems(updated);
            localStorage.setItem("compareCart", JSON.stringify(updated));
            alert("삭제되었습니다.");
        }
    };

    const handleClear = () => {
        if (!window.confirm("보관함의 모든 상품을 삭제할까요?")) return;

        if (isLoggedIn) {
            removeAll(() => {
                alert("보관함이 비워졌습니다.");
                reload();
            });
        } else {
            localStorage.removeItem("compareCart");
            setLocalItems([]);
            alert("보관함이 비워졌습니다.");
        }
    };

    const items = isLoggedIn ? apiItems : localItems;

    return (
        <div className="absolute bottom-20 right-0 w-[320px] bg-white rounded-lg overflow-hidden shadow-[0_0_8px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between py-3 px-4 bg-primary">
                <strong className="flex items-center gap-2 font-bold text-white">
                    내 보관함
                    <span className="flex items-center justify-center w-[18px] h-[18px] font-bold text-xs text-primary bg-white rounded-full">
                        {items.length}
                    </span>
                </strong>
                <div className="flex items-center gap-2">
                    <button
                        className="font-bold text-xs text-white"
                        onClick={handleClear}
                    >
                        전체 삭제
                    </button>
                    <button onClick={onClose}>
                        <IoClose size={20} color="#fff" />
                    </button>
                </div>
            </div>
            <ul className="max-h-[400px] overflow-y-auto">
                {items.length === 0 && (
                    <li className="py-7 text-sm text-gray-500 text-center">
                        보관함이 비어있습니다.
                    </li>
                )}
                {items.map((item) => (
                    <li
                        key={item.cartId}
                        className="flex items-center justify-between gap-5 p-4 border-b border-graye5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="shrink-0 w-[34px] h-[34px] rounded-full overflow-hidden bg-graye5">
                                {/* 은행로고 들어갈 자리 */}
                            </div>
                            <div>
                                <span className={`block font-bold text-xs ${item.productType === "DEPOSIT" ? 'text-primary' : 'text-green'}`}>
                                    {item.productType === "DEPOSIT" ? '예금' : '적금'}
                                </span>
                                <strong className="block font-bold text-sm">
                                    {item.productName}
                                </strong>
                                <p className="text-xs">{item.bankName}</p>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <button
                                className="flex items-center gap-1 font-bold text-sm text-red"
                                onClick={() => handleDelete(item.cartId)}
                            >
                                <span className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-red">
                                    <FaRegTrashAlt size={10} color="#fff" />
                                </span>
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default CartModal; 
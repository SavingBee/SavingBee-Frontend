import { FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const CartModal = () => {
    return (
        <div className="absolute bottom-20 right-0 w-[300px] bg-white rounded-lg overflow-hidden shadow-[0_0_8px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between py-3 px-4 bg-primary">
                <strong className="flex items-center gap-2 font-bold text-white">
                    내 보관함
                    <span className="flex items-center justify-center w-[18px] h-[18px] font-bold text-xs text-primary bg-white rounded-full">
                        2
                    </span>
                </strong>
                <button>
                    <IoClose size={20} color="#fff" />
                </button>
            </div>
            <ul>
                <li className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-[34px] h-[34px] rounded-full overflow-hidden bg-graye5">
                            {/* 은행로고 */}
                        </div>
                        <div>
                            <strong className="block font-bold text-sm">
                                상품명
                            </strong>
                            <p className="text-xs">
                                은행명
                            </p>
                        </div>
                    </div>
                    <div>
                        <button className="flex items-center gap-1 font-bold text-sm text-red">
                            <span
                                className="flex items-center justify-center w-[20px] h-[20px] rounded-full bg-red"
                            >
                                <FaRegTrashAlt size={10} color="#fff" />
                            </span>
                            삭제
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default CartModal; 
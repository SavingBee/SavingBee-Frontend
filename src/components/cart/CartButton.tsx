import { FaInbox } from "react-icons/fa6";

const CartButton = () => {
    return (
        <div>
            <span
                className="absolute top-0 left-0 flex items-center justify-center w-[20px] h-[20px] font-bold text-xs text-white bg-primary border-[2px] border-white rounded-full"
            >
                2
            </span>
            <button className="flex items-center justify-center w-[55px] h-[55px] bg-primary rounded-full">
                <FaInbox size={23} color="#fff" />
            </button>
        </div>
    )
}
export default CartButton;
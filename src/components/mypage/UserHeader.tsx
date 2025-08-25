import { AiOutlineBank } from "react-icons/ai";
import { GoPerson } from "react-icons/go";

const UserHeader = () => {
    return (
        <div className="flex items-center justify-between border border-graye5 rounded-lg px-7 py-8">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[70px] h-[70px] bg-grayf5 rounded-full">
                    <GoPerson size={30} color="#999" />
                </div>
                <div>
                    <strong className="block text-lg font-bold">
                        닉네임
                    </strong>
                    <p className="text-sm text-black6">
                        email@gmail.com
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 mr-5">
                <div className="flex items-center justify-center w-[50px] h-[50px] bg-grayf9 border border-graye9 rounded-full">
                    <AiOutlineBank size={22} color="#666" />
                </div>
                <div className="flex items-center gap-8">
                    <strong className="leading-[20px] font-semibold text-black6">
                        현재 <br />보유 상품
                    </strong>
                    <span className="block font-bold  text-primary text-2xl underline">
                        4
                    </span>
                </div>
            </div>
        </div>
    )
}
export default UserHeader;
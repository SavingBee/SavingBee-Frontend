import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";

const SnsLogin = () => {
    return (
        <div className="mt-10">
            <div className="flex items-center gap-2">
                <span className="w-full h-[1px] bg-graye5"></span>
                <p className="text-sm text-gray9 shrink-[0] font-medium">
                    SNS 로그인
                </p>
                <span className="w-full h-[1px] bg-graye5"></span>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
                <button className="flex items-center justify-center w-[47px] h-[47px] rounded-full bg-[#03C75A]">
                    <SiNaver size={16} color="white" />
                </button>
                <button className="flex items-center justify-center w-[47px] h-[47px] rounded-full border border-graye5">
                    <FaGoogle size={22} />
                </button>
            </div>
        </div>
    )
}
export default SnsLogin;
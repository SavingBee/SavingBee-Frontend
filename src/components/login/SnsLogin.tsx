import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const REDIRECT_URI = "https://savingbee.vercel.app/login/oauth2/code/naver"; // 등록한 callback URL

const SnsLogin = () => {
    const handleNaverLogin = () => {
        const state = crypto.randomUUID(); // CSRF 방지용 state
        const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&state=${state}`;
        window.location.href = naverLoginUrl;
    }

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
                <button
                    className="flex items-center justify-center w-[47px] h-[47px] rounded-full bg-[#03C75A]"
                    onClick={handleNaverLogin}
                >
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
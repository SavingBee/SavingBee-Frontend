import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignupStep3 = () => {
    return (
        <div>
            <FaCircleCheck size={80} color="#1976D3" className="mx-auto" />
            <strong className="block gmarket text-2xl text-center mt-5">
                회원가입이 <span className="text-primary">완료</span>되었습니다.
            </strong>
            <p className="leading-[22px] text-black6 text-center mt-3">
                이제 로그인하여 서비스를 <br />
                이용하실 수 있습니다.
            </p>
            <div className="flex gap-2 mt-4">
                <Link
                    to="/"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    메인으로
                </Link>
                <Link
                    to="/login"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-primary"
                >
                    로그인
                </Link>
            </div>
        </div>
    )
}
export default SignupStep3;
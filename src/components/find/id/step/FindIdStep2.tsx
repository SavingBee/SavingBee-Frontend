import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

// type ResultState = { username: string };

type Props = { username: string };

const FindIdStep2 = ({ username }: Props) => {
    // const { state } = useLocation() as { state: ResultState | undefined };
    // const username = state?.username;

    return (
        <div>
            <FaCircleCheck size={80} color="#1976D3" className="mx-auto" />
            <strong className="block gmarket text-2xl text-center mt-5">
                <span className="text-primary">아이디 찾기</span>가 완료되었습니다!
            </strong>
            <p className="leading-[22px] text-black6 text-center mt-3">
                회원님의 아이디는 <span className="font-bold text-primary">{username}</span>입니다.
            </p>
            <div className="flex gap-2 mt-4">
                <Link
                    to="/find/password"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    비밀번호 찾기
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
export default FindIdStep2;
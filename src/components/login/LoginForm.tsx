import { Link } from "react-router-dom";
import Button from "../common/button/Button";
import InputField1 from "../common/input/InputField1";

const LoginForm = () => {
    return (
        <div className="mt-10">
            <InputField1
                type="text"
                name="userId"
                id="userId"
                placeholder="아이디"
                inputClassName="w-full mb-1"
            />
            <InputField1
                type="password"
                name="userPassword"
                id="userPassword"
                placeholder="비밀번호"
                inputClassName="w-full mb-1"
            />
            <Button
                type="submit"
                className="bg-primary text-white mb-1"
            >
                로그인
            </Button>
            <Link
                to="/signup"
                className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-primary border border-primary"
            >
                회원가입
            </Link>
        </div>
    )
}
export default LoginForm;
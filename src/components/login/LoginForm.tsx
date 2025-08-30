import { Link } from "react-router-dom";
import Button from "../common/button/Button";
import InputField1 from "../common/input/InputField1";
import { useState } from "react";
import useLogin from "@/hooks/auth/useLogin";

const LoginForm = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { submit } = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit({ username, password });
    }

    return (
        <form onSubmit={handleSubmit} className="mt-10">
            <InputField1
                type="text"
                name="userId"
                id="userId"
                placeholder="아이디"
                inputClassName="w-full mb-1"
                onChange={(e) => setUserName(e.target.value)}
            />
            <InputField1
                type="password"
                name="userPassword"
                id="userPassword"
                placeholder="비밀번호"
                inputClassName="w-full mb-1"
                onChange={(e) => setPassword(e.target.value)}
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
        </form>
    )
}
export default LoginForm;
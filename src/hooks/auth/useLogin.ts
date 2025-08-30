import { login } from "@/api/auth/login";
import { AxiosError } from "axios";
import { useState } from "react";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (loginData: {
        username: string;
        password: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            await login(loginData);
            alert("로그인 성공");
            window.location.href = "/"; //메인으로 이동
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "로그인 실패");
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, error };
}
export default useLogin;
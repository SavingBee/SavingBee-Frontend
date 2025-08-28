import { login } from "@/api/auth/login";
import { AxiosError } from "axios";
import { useState } from "react";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (loginData: {
        userId: string;
        userPassword: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await login(loginData);

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
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

import { signup } from "@/api/auth/signup";
import { AxiosError } from "axios";
import { useState } from "react";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signupSubmit = async (signupData: {
        email: string;
        username: string;
        password: string;
        passwordConfirm: string;
        nickname: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await signup(signupData);

            if (res.status !== 201) {
                throw new Error("회원가입 처리에 실패했습니다.");
            }

            return res.data;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "회원가입 실패");
        } finally {
            setLoading(false);
        }
    };

    return { signupSubmit, loading, error };
}
export default useSignup;
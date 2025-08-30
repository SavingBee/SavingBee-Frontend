import { findResetPassword } from "@/api/find/findResetPassword";
import { AxiosError } from "axios";
import { useState } from "react";

const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = async (username: string, password: string, passwordConfirm: string) => {
        setLoading(true);
        setError(null);
        try {
            await findResetPassword(username, password, passwordConfirm);
            return true;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "비밀번호 변경에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { reset, loading, error };
}
export default useResetPassword;
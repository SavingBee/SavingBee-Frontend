/**
 * 비밀번호 찾기 인증코드 전송
 */
import { findPasswordSendEmailCode } from "@/api/auth/sendEmailCode";
import { AxiosError } from "axios";
import { useState } from "react";

const useSendEmailCode = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendCode = async (username: string, email: string) => {
        setLoading(true);
        setError(null);
        try {
            await findPasswordSendEmailCode(username, email);
            alert("인증번호를 발송했습니다. 메일함을 확인해주세요.");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "인증번호 전송에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { sendCode, loading, error };
}
export default useSendEmailCode;
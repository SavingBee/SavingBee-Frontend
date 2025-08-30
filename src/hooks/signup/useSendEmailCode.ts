/**
 * 회원가입 인증코드 전송
 */
import { sendEmailCodeSignup } from "@/api/auth/sendEmailCode";
import { AxiosError } from "axios";
import { useState } from "react";

const useSendEmailCode = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendCode = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            await sendEmailCodeSignup(email);
            alert("인증번호를 발송했습니다. 메일함을 확인해주세요.");

            return true;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            // 이미 사용중인 이메일이 있을 때
            if (axiosError.response?.status === 400) {
                alert("이미 사용 중인 이메일입니다.");
            }
            setError(axiosError.response?.data?.message || "인증번호 전송에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { sendCode, loading, error };
}
export default useSendEmailCode;
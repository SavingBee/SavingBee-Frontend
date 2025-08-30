import { VerifyCodeResponse, VerifyPayload } from "@/types/auth";
import { AxiosError } from "axios";
import { useState } from "react";

export type VerifyApiFn = (payload: VerifyPayload) => Promise<VerifyCodeResponse>;
export type VerifyBooleanFn = (payload: VerifyPayload) => Promise<boolean>;

const useVerifyCodeWith = (verifyFn: VerifyApiFn) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verify: VerifyBooleanFn = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const res = await verifyFn(payload);

            // 서버가 항상 200으로 주고 { valid: true|false } 반환하는 구조
            const valid = res.valid === true;
            if (!valid) setError("인증번호가 일치하지 않습니다.");

            alert("인증이 완료되었습니다.");

            return valid;
        } catch (err) {
            const axiosErr = err as AxiosError<{ message?: string; error?: string }>;
            setError(axiosErr.response?.data?.message || axiosErr.response?.data?.error || "인증 실패");

            return false;
        } finally {
            setLoading(false);
        }
    };

    return { verify, loading, error };
};

export default useVerifyCodeWith;

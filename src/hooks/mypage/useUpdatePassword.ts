/**
 * 마이페이지(비밀번호 변경)
 */

import { updatePassword, UpdatePasswordDto } from "@/api/mypage/updatePassword";
import { AxiosError } from "axios";
import { useState } from "react";

export const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: UpdatePasswordDto) => {
        setLoading(true);
        setError(null);
        try {
            await updatePassword(data);
            return { ok: true };
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const message = axiosError.response?.data?.message || "비밀번호 변경에 실패했습니다.";
            setError(message);
            return { ok: false, message };
        } finally {
            setLoading(false);
        }
    };

    return { update, loading, error };
}
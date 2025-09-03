/**
 * 회원탈퇴 API
 */

import { deleteAccount } from "@/api/mypage/deleteAccount";
import { AxiosError } from "axios";
import { useState } from "react";

export const useDeleteAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await deleteAccount(password);
            return { ok: true, message: res.message };
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const message = axiosError.response?.data?.message || "회원 탈퇴에 실패했습니다.";
            setError(message);
            return { ok: false, message };
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
}
/**
 * 회원정보 수정
 */

import { updateProfile } from "@/api/mypage/updateProfile";
import { AxiosError } from "axios";
import { useState } from "react";

export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (data: { email?: string; nickname?: string }) => {
        setLoading(true);
        setError(null);
        try {
            await updateProfile(data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "회원정보 수정에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { update, loading, error };
}
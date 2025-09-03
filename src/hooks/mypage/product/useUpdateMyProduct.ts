import { updateMyProduct } from "@/api/mypage/product/updateMyProduct";
import { AddMyProductRequest } from "@/types/product";
import { AxiosError } from "axios";
import { useState } from "react";

export const useUpdateMyProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = async (userProductId: number, data: Partial<AddMyProductRequest>) => {
        setLoading(true);
        setError(null);
        try {
            await updateMyProduct(userProductId, data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "회원정보 수정에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { update, loading, error };
}
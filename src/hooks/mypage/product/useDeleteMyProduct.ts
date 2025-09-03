/**
 * 보유 상품 삭제
 */
import { deleteMyProduct } from "@/api/mypage/product/deleteMyProduct";
import { AxiosError } from "axios";
import { useState } from "react";

export const useDeleteMyProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (userProductId: number | string, onSuccess?: () => void) => {
        setLoading(true);
        setError(null);
        try {
            await deleteMyProduct(userProductId);
            if (onSuccess) onSuccess();
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "상품 삭제에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
}
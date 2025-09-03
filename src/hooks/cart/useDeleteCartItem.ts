import { deleteCartItem } from "@/api/cart/deleteCartItem";
import { AxiosError } from "axios";
import { useState } from "react";

export const useDeleteCartItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (cartId: number, onSuccess?: () => void) => {
        setLoading(true);
        setError(null);
        try {
            await deleteCartItem(cartId);
            onSuccess?.();
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            const serverMsg = axiosError.response?.data?.error || "보관함 상품 삭제에 실패했습니다.";
            setError(serverMsg);
            alert(serverMsg);
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
};
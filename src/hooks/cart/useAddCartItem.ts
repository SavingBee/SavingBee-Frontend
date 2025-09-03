import { addCartItem, AddCartRequest } from "@/api/cart/addCartItem";
import { AxiosError } from "axios";
import { useState } from "react";

export const useAddCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const add = async (payload: AddCartRequest, onSuccess?: () => void) => {
        setLoading(true);
        setError(null);

        try {
            await addCartItem(payload);
            onSuccess?.();
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            const serverMsg = axiosError.response?.data?.error || "상품을 담는 데 실패했습니다.";
            setError(serverMsg);
            alert(serverMsg);
        } finally {
            setLoading(false);
        }
    };

    return { add, loading, error };
};
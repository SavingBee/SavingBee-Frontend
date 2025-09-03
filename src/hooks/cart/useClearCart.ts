import { clearCart, ClearCartResponse } from "@/api/cart/clearCart";
import { AxiosError } from "axios";
import { useState } from "react";

export const useClearCart = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ClearCartResponse | null>(null);

    const removeAll = async (onSuccess?: (res: ClearCartResponse) => void) => {
        setLoading(true);
        setError(null);
        try {
            const res = await clearCart();
            setResult(res);
            onSuccess?.(res);
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            const serverMsg = axiosError.response?.data?.error || "보관함 비우기에 실패했습니다.";
            setError(serverMsg);
            alert(serverMsg);
        } finally {
            setLoading(false);
        }
    };

    return { removeAll, loading, error, result };
};
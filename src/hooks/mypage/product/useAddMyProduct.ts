/**
 * 내 상품 등록
 */

import { addMyProduct } from "@/api/mypage/product/addMyProduct";
import { AddMyProductRequest } from "@/types/product";
import { AxiosError } from "axios";
import { useState } from "react";

export const useAddMyProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addProduct = async (data: AddMyProductRequest) => {
        setLoading(true);
        setError(null);
        try {
            await addMyProduct(data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "상품 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return { addProduct, loading, error };
}
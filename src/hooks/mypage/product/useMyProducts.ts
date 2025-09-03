/**
 * 보유 상품 가져오기
 */

import { getMyProducts } from "@/api/mypage/product/getMyProducts";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useMyProducts = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getMyProducts();
            setData(res.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "상품 목록을 가져오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return { data, loading, error, reload: loadProducts };
}
export default useMyProducts;
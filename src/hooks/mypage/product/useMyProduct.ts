/**
 * (단일조회) 보유 상품 가져오기
 */

import { getMyProduct } from "@/api/mypage/product/getMyProduct";
import { UserProductDetail } from "@/types/product";
import { AxiosError } from "axios";
import { useState } from "react";

const useMyProduct = () => {
    const [data, setData] = useState<UserProductDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProduct = async (userProductId: number | string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getMyProduct(userProductId);
            setData(res);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "상품을 가져오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, reload: loadProduct };
}
export default useMyProduct;
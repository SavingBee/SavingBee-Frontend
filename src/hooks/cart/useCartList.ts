import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { CartListResponse } from "@/types/cart";
import { getCartList } from "@/api/cart/getCartList";

type UseCartListParams = {
    bankName?: string;
    page?: number;
    size?: number;
};

const useCartList = (params: UseCartListParams = { page: 0, size: 10 }) => {
    const [data, setData] = useState<CartListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadCartList = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getCartList(params);
            setData(res);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "보관함 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCartList();
    }, [params.bankName, params.page, params.size]); // params 변경 시 자동 로딩

    return { data, loading, error, reload: loadCartList };
};

export default useCartList;

import api from "@/api/api";
import { UserProductDetail } from "@/types/product";

export const getMyProduct = async (userProductId: number | string): Promise<UserProductDetail> => {
    const res = await api.get(`/api/mypage/products/${userProductId}`);
    return res.data;
}
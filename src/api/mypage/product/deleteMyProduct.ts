import api from "@/api/api";

export const deleteMyProduct = async (userProductId: number | string) => {
    const res = await api.delete(`/api/mypage/products/${userProductId}`);
    return res.data;
}
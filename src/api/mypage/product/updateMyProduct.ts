import api from "@/api/api";
import { AddMyProductRequest } from "@/types/product";

export const updateMyProduct = (userProductId: number, data: Partial<AddMyProductRequest>) => {
    return api.put(`/api/mypage/products/${userProductId}`, data);
}
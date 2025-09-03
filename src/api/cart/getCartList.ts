import { CartListResponse } from "@/types/cart";
import api from "../api";

type GetCartListParams = {
    bankName?: string;
    page?: number;
    size?: number;
};

export const getCartList = async (params: GetCartListParams) => {
    const response = await api.get<CartListResponse>("/api/cart", { params });
    return response.data;
};

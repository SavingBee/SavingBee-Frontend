import api from "../api";

export type AddCartRequest = {
    productCode: string; // 상품 고유 코드
    productType: "DEPOSIT" | "SAVINGS";
};

export const addCartItem = async (data: AddCartRequest) => {
    const response = await api.post("/api/cart", data);
    return response.data;
};
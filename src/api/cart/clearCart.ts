import api from "../api";

export type ClearCartResponse = {
    message: string;
    deletedCount: number;
};

export const clearCart = async () => {
    const { data } = await api.delete<ClearCartResponse>("/api/cart/clear");
    return data;
};
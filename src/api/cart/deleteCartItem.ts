import api from "../api";

export const deleteCartItem = async (cartId: number) => {
    const { data } = await api.delete<{ message: string }>(`/api/cart/${cartId}`);
    return data;
};

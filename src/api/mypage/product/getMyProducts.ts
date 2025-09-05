import api from "@/api/api"

export const getMyProducts = () => {
    return api.get("/api/mypage/products");
}
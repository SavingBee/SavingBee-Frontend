
import { AddMyProductRequest } from "@/types/product";
import axios from "axios";

export const addMyProduct = async (data: AddMyProductRequest) => {
    const token = localStorage.getItem("accessToken");

    return axios.post("https://savingbee.monster/api/mypage/products", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
        timeout: 10000, // 선택: api.ts와 동일한 타임아웃
    });
};
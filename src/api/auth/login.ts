import api from "../api";

export const login = async (loginData: {
    username: string;
    password: string;
}) => {
    // 로그인 요청
    const res = await api.post("/login", loginData);

    const token = res.data.accessToken;

    localStorage.setItem("accessToken", token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return res.data;
}
import api from "../api";

export const deleteAccount = async (password: string) => {
    const res = await api.delete("/api/mypage/account", {
        data: { password }
    });
    return res.data;
}
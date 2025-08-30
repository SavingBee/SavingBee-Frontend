import api from "../api";

export const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
        await api.post("/auth/logout", {
            refreshToken: refreshToken || "", // 없어도 상관없지만 일단 보냄
        });
    } catch (err) {
        console.warn("🚨 로그아웃 요청 중 오류:", err);
    } finally {
        // 클라이언트 토큰 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        delete api.defaults.headers.common["Authorization"];

        alert("로그아웃 되었습니다.");

        // 리디렉션
        window.location.href = "/";
    }
}
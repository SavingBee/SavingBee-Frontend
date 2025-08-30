import useApiStore from "@/store/Store";
import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const token = localStorage.getItem("accessToken");

// Authorization 헤더 추가
if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// 요청 인터셉터 (토큰이 필요한지)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        // 모든 요청에 자동으로 Authorization 헤더 추가
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 요청 시작 시 로딩 ON
        useApiStore.getState().setLoading(true);

        return config;
    },

    (error) => Promise.reject(error)
)

// 응답 인터셉터
api.interceptors.response.use(
    (response) => {
        // 응답 도착 시 로딩 OFF
        useApiStore.getState().setLoading(false);
        return response;
    },
    (error) => {
        useApiStore.getState().setLoading(false);

        // 에러 상태 저장
        useApiStore.getState().setError(error?.response?.data?.message || "API 오류 발생");

        if (error.response?.status === 401) {
            // 토큰 만료 시
            alert("세션 만료. 다시 로그인 해주세요.")
            localStorage.removeItem("accessToken");
            window.location.href = "/login"
        }

        return Promise.reject(error);
    }
);

export default api;
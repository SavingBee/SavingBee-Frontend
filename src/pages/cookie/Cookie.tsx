import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cookie = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("refreshToken="))
            ?.split("=")[1];

        if (refreshToken) {
            fetch("/api/auth/refresh", {
                method: "POST",
                credentials: "include", // 쿠키 포함
            })
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem("accessToken", data.accessToken);
                    navigate("/"); // 메인 페이지로 이동
                })
                .catch((err) => {
                    console.error("토큰 재발급 실패:", err);
                    navigate("/login"); // 실패 시 로그인 페이지로 이동
                });
        } else {
            console.warn("refreshToken이 없습니다.");
            navigate("/login");
        }
    }, [navigate]);

    return null;
};

export default Cookie;
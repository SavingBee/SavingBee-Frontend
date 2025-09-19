import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cookie = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const refreshToken = document.cookie
    //         .split("; ")
    //         .find((row) => row.startsWith("refreshToken="))
    //         ?.split("=")[1];

    //     if (refreshToken) {
    //         fetch("/jwt/refresh", {
    //             method: "POST",
    //             credentials: "include", // 쿠키 포함
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 localStorage.setItem("accessToken", data.accessToken);
    //                 navigate("/"); // 메인 페이지로 이동
    //             })
    //             .catch((err) => {
    //                 console.error("토큰 재발급 실패:", err);
    //                 navigate("/login"); // 실패 시 로그인 페이지로 이동
    //             });
    //     } else {
    //         console.warn("refreshToken이 없습니다.");
    //         navigate("/login");
    //     }
    // }, [navigate]);

    // return null;

    const navigate = useNavigate();

    useEffect(() => {
        const exchangeTokens = async () => {
            try {
                // /jwt/exchange API 사용 (쿠키에서 자동으로 토큰 읽음)
                const response = await fetch("https://savingbee.monster/jwt/exchange", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include", // HttpOnly 쿠키 포함
                });

                if (response.ok) {
                    const data = await response.json();

                    // 토큰들을 localStorage에 저장
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);

                    console.log("토큰 교환 성공!");
                    navigate("/"); // 메인 페이지로 이동
                } else {
                    console.error("토큰 교환 실패:", response.status);
                    navigate("/login");
                }
            } catch (error) {
                console.error("토큰 교환 중 오류:", error);
                navigate("/login");
            }
        };

        exchangeTokens();
    }, [navigate]);

    return (
        <div>
            <p>로그인 처리 중...</p>
        </div>
    );
};

export default Cookie;
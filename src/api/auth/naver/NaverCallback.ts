import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const NaverCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");

        if (code && state) {
            // 백엔드 API 호출해서 code -> access token 교환
            fetch(`/api/auth/naver/callback?code=${code}&state=${state}`)
                .then(res => res.json())
                .then(data => {
                    console.log("로그인 성공:", data);
                    // 토큰 저장하고 리다이렉트
                    navigate("/");
                })
                .catch(err => console.error("네이버 로그인 실패:", err));
        }
    }, [navigate]);

    return;
}
export default NaverCallback;
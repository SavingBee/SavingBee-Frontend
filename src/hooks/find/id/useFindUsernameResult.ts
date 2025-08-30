import { findUsernmaeResult } from "@/api/find/findUsernmaeResult";
import { AxiosError } from "axios";
import { useState } from "react";

// 아이디 찾기 결과 조회
const useFindUsernameResult = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const findResult = async (email: string) => {
        setLoading(true);
        setError(null);
        setUsername(null);

        try {
            const res = await findUsernmaeResult(email);
            const name = res.data?.username;

            if (!name) {
                throw new Error("아이디를 찾을 수 없습니다.");
            }

            setUsername(name);
            return name;
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "아이디 찾기 실패");
        } finally {
            setLoading(false);
        }
    };

    return { findResult, loading, error, username };
}
export default useFindUsernameResult;
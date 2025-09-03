/**
 * 회원정보 가져오기 (username, email, nickname, isSocial)
 */
import { getMyProfile } from "@/api/mypage/getProfile";
import { MyProfile } from "@/types/user";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useMyProfile = () => {
    const [data, setData] = useState<MyProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getMyProfile();
            setData(res.data);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "사용자 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, [])

    return { data, loading, error, reload: loadProfile };
};
export default useMyProfile;

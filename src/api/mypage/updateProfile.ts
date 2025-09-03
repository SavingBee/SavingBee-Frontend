import api from "../api";

interface UpdateProfileDto {
    email?: string;
    nickname?: string
}

export const updateProfile = (data: UpdateProfileDto) => {
    return api.put("/api/mypage/profile", data);
}
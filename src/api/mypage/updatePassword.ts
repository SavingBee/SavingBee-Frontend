/**
 * 마이페이지(비밀번호변경)
 */

import api from "../api";

export interface UpdatePasswordDto {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
}

export const updatePassword = (data: UpdatePasswordDto) => {
    return api.put("/api/mypage/password", data);
}
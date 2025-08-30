import api from "../api";

export const findResetPassword = async (username: string, password: string, passwordConfirm: string) => {
    return api.post("/user/reset-password/complete", { username, password, passwordConfirm });
}
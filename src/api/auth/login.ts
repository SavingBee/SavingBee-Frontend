/**
 * (POST) 로그인 API
 */

import api from "../api";

export const login = (loginData: {
    userId: string;
    userPassword: string;
}) => {
    return api.post("/auth/login", loginData);
}
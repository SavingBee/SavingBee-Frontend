import { VerifyCodeResponse, VerifyPayload } from "@/types/auth";
import api from "../api"

// 회원가입: 인증코드 검증
export const verifyCodeSignup = async ({ email, verificationCode }: VerifyPayload) => {
    const res = await api.post("/user/signup/verify-code", { email, verificationCode });
    return res.data;
}

// 아이디 찾기: 인증코드 검증
export const verifyCodeFindUsername = async ({ email, verificationCode }: VerifyPayload) => {
    const res = await api.post("/user/find-username/verify-code", { email, verificationCode });
    return res.data;
}

// 비밀번호 찾기: 인증코드 검증
export const verifyCodeFindPassword = async ({ username, verificationCode }: VerifyPayload) => {
    const res = await api.post<VerifyCodeResponse>("/user/find-password/verify-code", { username, verificationCode });
    return res.data;
}

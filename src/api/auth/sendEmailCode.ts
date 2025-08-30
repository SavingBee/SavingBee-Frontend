import api from "../api"

// 회원가입 인증코드 전송
export const sendEmailCodeSignup = async (email: string) => {
    return api.post("/user/signup/send-code", { email });
}

// 아이디 찾기 인증코드 전송
export const findUsernameSendEmailCode = async (email: string) => {
    return api.post("/user/find-username/send-code", { email });
}

// 비밀번호 찾기 인증코드 전송
export const findPasswordSendEmailCode = async (username: string, email: string) => {
    return api.post("/user/find-password/send-code", { username, email });
}
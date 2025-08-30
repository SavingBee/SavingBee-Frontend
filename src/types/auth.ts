export interface VerifyCodeResponse {
    valid: boolean;
}

export type VerifyPayload = {
    email?: string;        // 회원가입/아이디찾기에서 사용
    username?: string;     // 비밀번호찾기에서 추가로 사용
    verificationCode: string;
};
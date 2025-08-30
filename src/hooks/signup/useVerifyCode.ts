/**
 * 회원가입 인증코드 검증
 */
import { verifyCodeSignup } from "@/api/auth/verifyCode";
import useVerifyCodeWith from "../auth/useVerifyCodeWith";

export default function useVerifyCode() {
    return useVerifyCodeWith(verifyCodeSignup);
}

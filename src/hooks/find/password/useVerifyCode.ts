/**
 * 비밀번호 찾기 인증코드 검증
 */
import { verifyCodeFindPassword } from "@/api/auth/verifyCode";
import useVerifyCodeWith from "@/hooks/auth/useVerifyCodeWith";

export default function useVerifyCode() {
    return useVerifyCodeWith(verifyCodeFindPassword);
}

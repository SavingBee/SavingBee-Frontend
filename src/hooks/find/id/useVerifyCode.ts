/**
 * 아이디 찾기 인증코드 검증
 */
import { verifyCodeFindUsername } from "@/api/auth/verifyCode";
import useVerifyCodeWith from "@/hooks/auth/useVerifyCodeWith";

export default function useVerifyCode() {
    return useVerifyCodeWith(verifyCodeFindUsername);
}

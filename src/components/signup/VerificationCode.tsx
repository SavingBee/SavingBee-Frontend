import { IoMdInformationCircleOutline } from "react-icons/io";
import InputField1 from "../common/input/InputField1";
import { useState } from "react";
import { VerifyPayload } from "@/types/auth";
import { VerifyBooleanFn } from "@/hooks/auth/useVerifyCodeWith";

type Props = {
    username?: string;
    email?: string;
    onSuccess: () => void;
    verifyFn: VerifyBooleanFn;
    onResend?: () => Promise<void>;
    resendLoading?: boolean;
};

const VerificationCode = ({ username, email, onSuccess, verifyFn, onResend, resendLoading }: Props) => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleCheck = async () => {
        if (!verificationCode) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        const payload: VerifyPayload = { username, email, verificationCode };
        const valid = await verifyFn(payload);
        if (valid) onSuccess();
        else alert("인증번호가 올바르지 않습니다.");
    }

    return (
        <div className="bg-lightPrimary px-[25px] py-[23px] rounded-md mt-2">
            <p className="font-semibold text-sm mb-2">인증코드를 입력해주세요.</p>
            <div className="relative">
                <InputField1
                    type="text"
                    id="code"
                    name="code"
                    placeholder="인증번호"
                    inputClassName="w-full"
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                    type="button"
                    onClick={handleCheck}
                    className="absolute top-0 right-[15px] h-full font-semibold text-sm text-primary"
                >
                    Check
                </button>
            </div>
            <div className="flex items-center text-primary text-sm mt-2">
                <IoMdInformationCircleOutline size={18} />
                인증코드를 받지 못했나요?
                <button
                    onClick={onResend}
                    disabled={resendLoading}
                    className="font-semibold underline ml-1"
                >
                    {resendLoading ? "재발송 중..." : "Resend"}
                </button>
            </div>
        </div>
    )
}
export default VerificationCode;
import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import VerificationCode from "@/components/signup/VerificationCode";
import useFindUsernameResult from "@/hooks/find/id/useFindUsernameResult";
import useSendEmailCode from "@/hooks/find/id/useSendEmailCode";
import { useState } from "react";
import useVerifyCode from "@/hooks/find/id/useVerifyCode";

type Props = { onNext: (username: string) => void };

const FindIdStep1 = ({ onNext }: Props) => {
    const [email, setEmail] = useState('');

    // 인증코드 발송
    const [codeSent, setCodeSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);

    // 1) 인증코드 발송 훅
    const { sendCode, loading: sendLoading } = useSendEmailCode();

    // 2) 아이디 찾기용 인증코드 검증 훅
    const { verify, loading: verifyLoading } = useVerifyCode();

    const { findResult } = useFindUsernameResult();

    const handleSendCode = async () => {
        const trimmed = email.trim();
        const emailOk = /\S+@\S+\.\S+/.test(trimmed);
        if (!emailOk) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }
        try {
            await sendCode(trimmed);
            setCodeSent(true);
        } catch (e) {
            // 에러 메시지는 훅의 error로 표시됨
            console.error(e);
        }
    };

    const handleNext: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!codeVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        const name = await findResult(email.trim());
        if (name) {
            // 다음 페이지로 이동하며 전달
            onNext(name);
        }
    };

    const disableAll = sendLoading || verifyLoading;

    return (
        <div>
            <form onSubmit={handleNext} className="border-t border-gray9">
                <InputField1
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    placeholder="이메일"
                    label="이메일"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disableAll || codeSent}
                    labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                    inputClassName="w-full mt-1"
                    required
                />
                <Button
                    type="button"
                    className="border-primary text-primary mt-2"
                    styleVariant="border"
                    disabled={disableAll || codeVerified}
                    onClick={handleSendCode}
                >
                    {codeVerified ? "인증완료" : sendLoading ? "발송 중" : "인증번호 발송"}
                </Button>
                {/* 인증번호 검증 영역 */}
                {codeSent && !codeVerified && (
                    <div>
                        <VerificationCode
                            email={email}
                            verifyFn={verify}
                            onSuccess={() => setCodeVerified(true)}
                            onResend={() => sendCode(email.trim())}
                            resendLoading={sendLoading}
                        />
                    </div>
                )}
                <div className="flex gap-2 mt-4">
                    <Button
                        type="button"
                        className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                    >
                        이전
                    </Button>
                    <Button
                        type="submit"
                        className="text-white bg-primary"
                    >
                        다음
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default FindIdStep1;
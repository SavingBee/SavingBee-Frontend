import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import VerificationCode from "@/components/signup/VerificationCode";
import useSendEmailCode from "@/hooks/find/password/useSendEmailCode";
import useVerifyCode from "@/hooks/find/password/useVerifyCode";
import { useState } from "react";

type Props = { onNext: (username: string) => void };

const FindPasswordStep1 = ({ onNext }: Props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [codeSent, setCodeSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);

    // 1. 인증코드 발송 훅
    const { sendCode, loading: sendLoading } = useSendEmailCode();

    // 인증코드 발송 핸들러
    const handleSendCode = async () => {
        const trimmed = email.trim();
        const emailOk = /\S+@\S+\.\S+/.test(trimmed);
        if (!emailOk) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }
        if (!username.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }

        try {
            await sendCode(username.trim(), trimmed);
            setCodeSent(true);
        } catch (e) {
            console.error(e);
        }
    }

    // 2. 비밀번호 찾기용 인증코드 검증 훅
    const { verify } = useVerifyCode();

    // 다음 비밀번호 재설정 페이지로 이동
    const handleNext = () => {
        if (!codeVerified) {
            alert("이메일 인증을 먼저 완료해주세요.");
            return;
        }

        // username도 같이 전달
        onNext(username);
    }

    return (
        <div>
            <form className="border-t border-gray9">
                <InputField1
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="아이디"
                    label="아이디"
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={codeSent}
                    labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                    inputClassName="w-full mt-1"
                    required
                />
                <InputField1
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    placeholder="이메일"
                    label="이메일"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={codeSent}
                    labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                    inputClassName="w-full mt-1"
                    required
                />
                <Button
                    type="button"
                    onClick={handleSendCode}
                    className="border-primary text-primary mt-2"
                    styleVariant="border"
                >
                    {codeVerified ? "인증완료" : sendLoading ? "발송 중" : "인증번호 발송"}
                </Button>
                {/* 인증번호 검증 영역 */}
                {codeSent && !codeVerified && (
                    <div>
                        <VerificationCode
                            username={username}
                            verifyFn={verify}
                            onSuccess={() => setCodeVerified(true)}
                            onResend={() => sendCode(username, email.trim())}
                            resendLoading={sendLoading}
                        />
                    </div>
                )}
            </form>
            <div className="flex gap-2 mt-4">
                <Button
                    type="button"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    이전
                </Button>
                <Button
                    type="button"
                    className="text-white bg-primary"
                    onClick={handleNext}
                >
                    다음
                </Button>
            </div>
        </div>
    )
}
export default FindPasswordStep1;
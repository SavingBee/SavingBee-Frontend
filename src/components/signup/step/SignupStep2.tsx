import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import PasswordFields from "@/components/PasswordFields";
import useSendEmailCode from "@/hooks/signup/useSendEmailCode";
import { useState } from "react";
import VerificationCode from "../VerificationCode";
import useSignup from "@/hooks/auth/useSignup";
import useVerifyCode from "@/hooks/signup/useVerifyCode";


interface SignupStep1Props {
    onNext: () => void;
    onPrev: () => void;
}

const SignupStep2 = ({ onNext, onPrev }: SignupStep1Props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickname, setNickname] = useState('');

    // 인증코드 발송
    const [codeSent, setCodeSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);

    // 1) 인증코드 발송 훅
    const { sendCode, loading: sendLoading } = useSendEmailCode();

    // 2) 회원가입용 인증코드 검증 훅
    const { verify, loading: verifyLoading } = useVerifyCode();

    const handleSendCode = async () => {
        if (!email.includes("@")) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }

        const ok = await sendCode(email);
        if (ok) setCodeSent(true);
    }

    const disableAll = sendLoading || verifyLoading;

    // 회원가입
    const { signupSubmit, loading: signupLoading } = useSignup();
    const handleSignup: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        if (!codeVerified) { alert("이메일 인증을 완료해주세요."); return; }
        if (username.trim().length < 4) { alert("아이디는 최소 4자입니다."); return; }

        // 비밀번호 조건 체크
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        const typesCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

        if (password.length < 8 || typesCount < 2) { alert("비밀번호는 최소 8자이며, 영문/숫자/특수문자 중 2가지 이상을 포함해야 합니다."); return; }
        if (password !== passwordConfirm) { alert("비밀번호가 일치하지 않습니다."); return; }

        // 닉네임 조건 체크
        if (!nickname.trim()) { alert("닉네임을 입력해주세요."); return; }

        try {
            await signupSubmit({ email: trimmedEmail, username: username.trim(), password, passwordConfirm, nickname: nickname.trim() });
            alert("회원가입 성공");
            onNext();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={handleSignup} className="border-t border-gray9">
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
                onClick={handleSendCode}
                className="border-primary text-primary mt-2"
                styleVariant="border"
                disabled={disableAll || codeVerified}
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
                        onResend={async () => {
                            await sendCode(email.trim());
                        }}
                        resendLoading={sendLoading}
                    />
                </div>
            )}
            <InputField1
                type="text"
                id="userId"
                name="userId"
                placeholder="아이디"
                label="아이디"
                onChange={(e) => setUsername(e.target.value)}
                labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                inputClassName="w-full mt-1"
                required
            />
            <InputField1
                type="text"
                id="userNickname"
                name="userNickname"
                placeholder="닉네임"
                label="닉네임"
                onChange={(e) => setNickname(e.target.value)}
                labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                inputClassName="w-full mt-1"
                required
            />
            <PasswordFields
                password={password}
                passwordCheck={passwordConfirm}
                setPassword={setPassword}
                setPasswordCheck={setPasswordConfirm}
            />
            <div className="flex gap-2 mt-4">
                <Button
                    type="button"
                    onClick={onPrev}
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    이전
                </Button>
                <Button
                    type="submit"
                    className="text-white bg-primary"
                >
                    {signupLoading ? "처리 중" : "다음"}
                </Button>
            </div>
        </form>
    )
}
export default SignupStep2;
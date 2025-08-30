import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import PasswordFields from "@/components/PasswordFields";
import useResetPassword from "@/hooks/find/password/useResetPassword";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type Props = { username: string };

const FindPasswordStep2 = ({ username }: Props) => {
    const { reset } = useResetPassword();

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigate = useNavigate();

    if (!username) {
        return <Navigate to="/find/password" replace />;
    }

    const handlePasswordReset = async () => {
        if (password.length < 4) { alert("비밀번호는 최소 4자입니다."); return; }
        if (password !== passwordConfirm) { alert("비밀번호가 일치하지 않습니다."); return; }

        const ok = await reset(username, password, passwordConfirm);
        if (ok) {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            navigate("/login");
        }
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
                    value={username}
                    labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                    inputClassName="w-full mt-1"
                    disabled
                    required
                />
                <PasswordFields
                    password={password}
                    passwordCheck={passwordConfirm}
                    setPassword={setPassword}
                    setPasswordCheck={setPasswordConfirm}
                    passwordLabel="새 비밀번호"
                    passwordCheckLabel="새 비밀번호 확인"
                />
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
                    onClick={handlePasswordReset}
                    className="text-white bg-primary"
                >
                    비밀번호 변경
                </Button>
            </div>
        </div>
    )
}
export default FindPasswordStep2;
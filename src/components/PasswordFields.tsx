import { FaCheck } from "react-icons/fa6";
import InputField1 from "./common/input/InputField1";

interface PasswordFieldsProps {
    password: string;
    passwordCheck: string;
    setPassword: (val: string) => void;
    setPasswordCheck: (val: string) => void;
    passwordLabel?: string;
    passwordCheckLabel?: string;
}

const PasswordFields = ({ password, passwordCheck, setPassword, setPasswordCheck, passwordLabel, passwordCheckLabel }: PasswordFieldsProps) => {
    const isComplex = (pw: string): boolean => {
        const hasLetter = /[a-zA-Z]/.test(pw);
        const hasNumber = /[0-9]/.test(pw);
        const hasSpecial = /[^a-zA-Z0-9]/.test(pw);
        return [hasLetter, hasNumber, hasSpecial].filter(Boolean).length >= 2;
    };
    
    return (
        <>
            <InputField1
                type="password"
                id="userPassword"
                name="userPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={passwordLabel || "비밀번호"}
                label={passwordLabel || "비밀번호"}
                labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                inputClassName="w-full mt-1"
                required
            />
            <ul className="flex gap-1 mt-1 text-sm">
                <li className={`flex items-center gap-1 ${password.length >= 8 ? 'text-primary font-bold' : 'text-black6'}`}>
                    <FaCheck /> 최소 8자
                </li>
                <li className={`flex items-center gap-1 ${isComplex(password) ? 'text-primary font-bold' : 'text-black6'}`}>
                    <FaCheck /> 영문, 숫자, 특수문자 2가지 조합
                </li>
            </ul>
            <InputField1
                type="password"
                id="userPasswordCheck"
                name="userPasswordCheck"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                placeholder={passwordCheckLabel || "비밀번호 확인"}
                label={passwordCheckLabel || "비밀번호 확인"}
                labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                inputClassName="w-full mt-1"
                required
            />
            <ul className="flex items-center gap-2 mt-1 text-sm">
                <li
                    className={`flex items-center gap-1 ${
                        password && passwordCheck && password === passwordCheck
                        ? 'text-primary font-bold'
                        : 'text-black6'
                    }`}
                >
                    <FaCheck /> 비밀번호 일치
                </li>
            </ul>
        </>
    )
}
export default PasswordFields;
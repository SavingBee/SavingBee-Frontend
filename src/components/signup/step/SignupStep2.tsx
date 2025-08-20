import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
import PasswordFields from "@/components/PasswordFields";
import { useState } from "react";


interface SignupStep1Props {
    onNext: () => void;
    onPrev: () => void;
}

const SignupStep2 = ({ onNext, onPrev }: SignupStep1Props) => {
    const [ password, setPassword ] = useState('');
    const [ passwordCheck, setPasswordCheck ] = useState('');

    return (
        <form className="border-t border-gray9">
            <InputField1
                type="text"
                id="userEmail"
                name="userEmail"
                placeholder="이메일"
                label="이메일"
                labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                inputClassName="w-full mt-1"
                required
            />
            <Button
                type="submit"
                className="border-primary text-primary mt-2"
                styleVariant="border"
            >
                인증번호 발송
            </Button>
            <InputField1
                type="text"
                id="userId"
                name="userId"
                placeholder="아이디"
                label="아이디"
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
                labelClassName="block w-full font-bold text-sm text-black6 mt-6"
                inputClassName="w-full mt-1"
                required
            />
            <PasswordFields
                password={password}
                passwordCheck={passwordCheck}
                setPassword={setPassword}
                setPasswordCheck={setPasswordCheck}
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
                    onClick={onNext}
                    className="text-white bg-primary"
                >
                    다음
                </Button>
            </div>
        </form>
    )
}
export default SignupStep2;
import Button from "@/components/common/button/Button";
import PasswordFields from "@/components/PasswordFields";
import { useState } from "react";


const FindPasswordStep2 = () => {
    const [ password, setPassword ] = useState('');
    const [ passwordCheck, setPasswordCheck ] = useState('');

    return (
        <div>
            <form className="border-t border-gray9">
                <PasswordFields
                    password={password}
                    passwordCheck={passwordCheck}
                    setPassword={setPassword}
                    setPasswordCheck={setPasswordCheck}
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
                    type="submit"
                    className="text-white bg-primary"
                >
                    다음
                </Button>
            </div>
        </div>
    )
}
export default FindPasswordStep2;
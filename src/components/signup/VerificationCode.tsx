import { IoMdInformationCircleOutline } from "react-icons/io";
import InputField1 from "../common/input/InputField1";

const VerificationCode = () => {
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
                />
                <button className="absolute top-0 right-[15px] h-full font-semibold text-sm text-primary ">Check</button>
            </div>
            <div className="flex items-center text-primary text-sm mt-2">
                <IoMdInformationCircleOutline size={18} />
                인증코드를 받지 못했나요?
                <button className="font-semibold underline ml-1">
                    Resend
                </button>
            </div>
        </div>
    )
}
export default VerificationCode;
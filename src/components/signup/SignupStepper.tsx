import StepArrow from "./StepArrow";
import StepItem from "./StepItem";

import { RiFilePaper2Fill } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

interface SignupStepperProps {
    step: number;
}

const SignupStepper = ({ step }: SignupStepperProps) => {
    return (
        <div className="flex items-center justify-between max-w-[300px] w-full mx-auto mb-10 mt-10">
            <StepItem icon={<RiFilePaper2Fill size={22} color={step === 1 ? "#fff" : "#999"} />} label="약관동의" active={step === 1} />
            <StepArrow />
            <StepItem icon={<BsPersonFill size={26} color={step === 2 ? "#fff" : "#999"} />} label="정보입력" active={step === 2} />
            <StepArrow />
            <StepItem icon={<FaCheck size={19} color={step === 3 ? "#fff" : "#999"} />} label="가입완료" active={step === 3} />
        </div>
    )
}
export default SignupStepper;
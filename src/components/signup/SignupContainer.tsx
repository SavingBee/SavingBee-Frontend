import { useState } from "react";
import PageHeader from "../common/pageHeader/PageHeader";
import SignupStepper from "./SignupStepper";
import SignupStep1 from "./step/SignupStep1";
import SignupStep2 from "./step/SignupStep2";
import SignupStep3 from "./step/SignupStep3";

const SignupContainer = () => {
    const [ step, setStep ] = useState(1);

    return (
        <div>
            <PageHeader
                title="회원가입"
                titleClassName="text-center"
            />
            <SignupStepper step={step} />
            {step === 1 && <SignupStep1 onNext={() => setStep(2)} />}
            {step === 2 && <SignupStep2 onNext={() => setStep(3)} onPrev={() => setStep(1)} />}
            {step === 3 && <SignupStep3 />}
        </div>
    )
}
export default SignupContainer;
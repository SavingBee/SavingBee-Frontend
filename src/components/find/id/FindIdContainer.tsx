import { useState } from "react";
import PageHeader from "../../common/pageHeader/PageHeader";
import FindIdStep1 from "./step/FindIdStep1";
import FindIdStep2 from "./step/FindIdStep2";

const FindIdContainer = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [username, setUsername] = useState("");

    return (
        <div>
            <PageHeader
                title="아이디 찾기"
                titleClassName="text-center"
            />
            <div className="mt-10">
                {step === 1 && (
                    <FindIdStep1
                        onNext={(uname) => {
                            setUsername(uname);
                            setStep(2);
                        }}
                    />

                )}
                {step === 2 && <FindIdStep2 username={username} />}
            </div>
        </div>
    )
}
export default FindIdContainer;
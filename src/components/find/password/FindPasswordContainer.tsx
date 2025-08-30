import { useState } from "react";
import PageHeader from "../../common/pageHeader/PageHeader";
import FindPasswordStep1 from "./step/FindPasswordStep1";
import FindPasswordStep2 from "./step/FindPasswordStep2";

const FindPasswordContainer = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const [username, setUsername] = useState("");

    return (
        <div>
            <PageHeader
                title="비밀번호 찾기"
                titleClassName="text-center"
            />
            <div className="mt-10">
                {step === 1 && (
                    <FindPasswordStep1
                        onNext={(uname) => {
                            setUsername(uname);
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && <FindPasswordStep2 username={username} />}
            </div>
        </div>
    )
}
export default FindPasswordContainer;
import PageHeader from "../../common/pageHeader/PageHeader";
import FindPasswordStep1 from "./step/FindPasswordStep1";

const FindPasswordContainer = () => {
    return (
        <div>
            <PageHeader
                title="비밀번호 찾기"
                titleClassName="text-center"
            />
            <div className="mt-10">
                <FindPasswordStep1 />
            </div>
        </div>
    )
}
export default FindPasswordContainer;
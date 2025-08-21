import PageHeader from "../../common/pageHeader/PageHeader";
import FindIdStep1 from "./step/FindIdStep1";

const FindIdContainer = () => {
    return (
        <div>
            <PageHeader
                title="아이디 찾기"
                titleClassName="text-center"
            />
            <div className="mt-10">
                <FindIdStep1 />
            </div>
        </div>
    )
}
export default FindIdContainer;
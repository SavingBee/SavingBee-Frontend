import PageHeader from "../common/pageHeader/PageHeader";
import FindIdAndPassword from "./FindIdAndPassword";
import LoginForm from "./LoginForm"
import SnsLogin from "./SnsLogin";

const LoginContainer = () => {
    return (
        <div className="mt-20">
            <PageHeader
                title="로그인"
                titleClassName="text-center"
            />
            <LoginForm />
            <FindIdAndPassword />
            <SnsLogin />
        </div>
    )
}
export default LoginContainer;
import PageHeader from "../components/common/pageHeader/PageHeader";

const Login = () => {
  return (
    <>
      <PageHeader
        title="회원 관리"
        breadcrumb={[
          { label: "홈", to: "/" },
          { label: "회원" },
          { label: "회원 관리" },
        ]}
      />
      <p>로그인 화면</p>
    </>
  );
};

export default Login;

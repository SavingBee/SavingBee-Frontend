import Button from "@/components/common/button/Button";
import Checkbox from "@/components/common/input/Checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SignupStep1Props {
  onNext: () => void;
}

const SignupStep1 = ({ onNext }: SignupStep1Props) => {
  const [agreeTerms, setAgreeTerms] = useState({
    all: false,
    required: false,
    optional: false,
  });

  // 전체 동의 핸들러
  const handleAllCheck = (checked: boolean) => {
    setAgreeTerms({
      all: checked,
      required: checked,
      optional: checked,
    });
  };

  // 필수 약관 핸들러
  const handleRequiredCheck = (checked: boolean) => {
    const allChecked = checked && agreeTerms.optional;
    setAgreeTerms({
      ...agreeTerms,
      required: checked,
      all: allChecked,
    });
  };

  // 선택 약관 핸들러
  const handleOptionalCheck = (checked: boolean) => {
    const allChecked = checked && agreeTerms.required;
    setAgreeTerms({
      ...agreeTerms,
      optional: checked,
      all: allChecked,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-[52px] bg-lightPrimary rounded-md">
        <Checkbox
          name="allCheck"
          id="allCheck"
          label="전체 동의"
          labelClassName="font-semibold text-black4"
          checked={agreeTerms.all}
          onChange={(e) => handleAllCheck(e.target.checked)}
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-1">
          <Checkbox
            name="terms1"
            id="terms1"
            label="이용약관"
            labelClassName="font-medium text-black6"
            checked={agreeTerms.required}
            onChange={(e) => handleRequiredCheck(e.target.checked)}
          />
          <span className="text-primary font-bold">(필수)</span>
        </div>
        <div className="h-[150px] mt-2 px-4 py-3 text-sm text-black6 border border-f5 rounded-md overflow-y-scroll">
          <p>
            제1조 (목적)<br />
            이 약관은 [회사명] (이하 "회사")가 제공하는 모든 서비스(웹사이트, 앱 등)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br /><br />
            제2조 (정의)<br />
            "서비스"라 함은 회사가 제공하는 모든 온라인 서비스를 의미합니다.<br />
            "회원"이라 함은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.<br />
            "콘텐츠"란 텍스트, 이미지, 동영상, 음악 등 서비스 내 제공되는 모든 자료를 의미합니다.<br /><br />
            제3조 (약관의 효력 및 변경)<br />
            본 약관은 서비스 초기 화면에 게시하거나 기타 방법으로 회원에게 공지함으로써 효력을 발생합니다.<br />
            회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경된 약관은 공지한 날로부터 7일 후 효력이 발생합니다.<br /><br />
            제4조 (회원가입 및 이용계약 체결)<br />
            회원가입은 회원이 약관에 동의하고, 회사가 정한 가입 절차에 따라 신청 후 승낙함으로써 성립됩니다.<br />
            회사는 다음 각 호에 해당하는 경우 가입을 거부하거나, 이후에도 이용계약을 해지할 수 있습니다:<br />
            타인의 명의를 도용한 경우<br />
            허위 정보를 기재한 경우<br />
            기타 부정한 목적의 신청<br /><br />
            제5조 (서비스 이용 및 제한)<br />
            서비스는 연중무휴 24시간 제공함을 원칙으로 하나, 회사의 사정에 따라 일시 중단될 수 있습니다.<br />
            회원은 서비스를 불법적인 목적으로 사용할 수 없습니다.<br /><br />
            제6조 (개인정보 보호)<br />
            회사는 관련 법령에 따라 회원의 개인정보를 보호하며, 개인정보 처리방침은 별도로 게시합니다.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-1">
          <Checkbox
            name="terms2"
            id="terms2"
            label="마케팅 정보 수신 동의"
            labelClassName="font-medium text-black6"
            checked={agreeTerms.optional}
            onChange={(e) => handleOptionalCheck(e.target.checked)}
          />
          <span className="text-gray9 font-bold">(선택)</span>
        </div>
        <div className="h-[150px] mt-2 px-4 py-3 text-sm text-black6 border border-f5 rounded-md overflow-y-scroll">
          <p>
            제1조 (목적)<br />
            이 약관은 [회사명] (이하 "회사")가 제공하는 모든 서비스(웹사이트, 앱 등)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br /><br />
            제2조 (정의)<br />
            "서비스"라 함은 회사가 제공하는 모든 온라인 서비스를 의미합니다.<br />
            "회원"이라 함은 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.<br />
            "콘텐츠"란 텍스트, 이미지, 동영상, 음악 등 서비스 내 제공되는 모든 자료를 의미합니다.<br /><br />
            제3조 (약관의 효력 및 변경)<br />
            본 약관은 서비스 초기 화면에 게시하거나 기타 방법으로 회원에게 공지함으로써 효력을 발생합니다.<br />
            회사는 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있으며, 변경된 약관은 공지한 날로부터 7일 후 효력이 발생합니다.<br /><br />
            제4조 (회원가입 및 이용계약 체결)<br />
            회원가입은 회원이 약관에 동의하고, 회사가 정한 가입 절차에 따라 신청 후 승낙함으로써 성립됩니다.<br />
            회사는 다음 각 호에 해당하는 경우 가입을 거부하거나, 이후에도 이용계약을 해지할 수 있습니다:<br />
            타인의 명의를 도용한 경우<br />
            허위 정보를 기재한 경우<br />
            기타 부정한 목적의 신청<br /><br />
            제5조 (서비스 이용 및 제한)<br />
            서비스는 연중무휴 24시간 제공함을 원칙으로 하나, 회사의 사정에 따라 일시 중단될 수 있습니다.<br />
            회원은 서비스를 불법적인 목적으로 사용할 수 없습니다.<br /><br />
            제6조 (개인정보 보호)<br />
            회사는 관련 법령에 따라 회원의 개인정보를 보호하며, 개인정보 처리방침은 별도로 게시합니다.
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Link
          to="/signup"
          className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
        >
          이전
        </Link>
        <Button
          type="button"
          onClick={() => {
            if (!agreeTerms.required) {
              alert("필수 약관에 동의해주세요.");
              return;
            }
            onNext();
          }}
          className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-primary"
        >
          다음
        </Button>
      </div>
    </div>
  );
};
export default SignupStep1;

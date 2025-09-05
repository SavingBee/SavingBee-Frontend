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
        <div className="h-[150px] mt-2 border border-f5 rounded-md overflow-y-scroll"></div>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-1">
          <Checkbox
            name="terms2"
            id="terms2"
            label="이용약관"
            labelClassName="font-medium text-black6"
            checked={agreeTerms.optional}
            onChange={(e) => handleOptionalCheck(e.target.checked)}
          />
          <span className="text-gray9 font-bold">(선택)</span>
        </div>
        <div className="h-[150px] mt-2 border border-f5 rounded-md overflow-y-scroll"></div>
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

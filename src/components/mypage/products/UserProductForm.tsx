import Button from "@/components/common/button/Button";
import Select from "@/components/common/button/Select";
import DatePickerInput from "@/components/common/input/DatePickerInput";
import InputField1 from "@/components/common/input/InputField1";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import { useAddMyProduct } from "@/hooks/mypage/product/useAddMyProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProductForm = () => {
    const [bankName, setBankName] = useState("");
    const [productType, setProductType] = useState("");
    const [productName, setProductName] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [termMonths, setTermMonths] = useState("");
    const [joinDate, setJoinDate] = useState<Date | null>(new Date());
    const [maturityDate, setMaturityDate] = useState<Date | null>(new Date());

    const { addProduct } = useAddMyProduct();

    const navigate = useNavigate();

    // 가입 금액 쉼표
    const formatNumber = (value: string) => {
        const number = value.replace(/,/g, "").replace(/\D/g, ""); // 숫자만
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatDecimal = (value: string): string => {
        // 숫자와 점(.)만 남기고 모두 제거
        let sanitized = value.replace(/[^0-9.]/g, "");

        // 소수점이 여러 개 들어간 경우 → 첫 번째만 남기고 나머지 제거
        const parts = sanitized.split(".");
        if (parts.length > 2) {
            sanitized = parts[0] + "." + parts.slice(1).join("").replace(/\./g, "");
        }

        // 소수점 뒤는 최대 2자리까지만
        if (sanitized.includes(".")) {
            const [intPart, decimalPart] = sanitized.split(".");
            sanitized = intPart + "." + decimalPart.slice(0, 2);
        }

        return sanitized;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 빈 값 검사
        if (
            !bankName ||
            !productType ||
            !productName ||
            !interestRate ||
            !depositAmount ||
            !termMonths ||
            !joinDate ||
            !maturityDate
        ) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const payload = {
            bankName,
            productType,
            productName,
            interestRate: parseFloat(interestRate),
            depositAmount: parseInt(depositAmount, 10),
            termMonths: parseInt(termMonths, 10),
            joinDate: joinDate?.toISOString().split("T")[0] || "",
            maturityDate: maturityDate?.toISOString().split("T")[0] || "",
        };

        await addProduct(payload);

        const confirmed = window.confirm("등록하시겠습니까?");
        if (!confirmed) return;

        window.location.href = "/mypage";
    };

    return (
        <>
            <PageHeader
                title="보유 상품 등록"
                breadcrumb={[
                    { label: "홈", to: "/" },
                    { label: "마이페이지", to: "/mypage" },
                    { label: "보유 상품 등록", to: "/mypage" },
                ]}
            />
            <form onSubmit={handleSubmit} className="border-t border-gray9">
                <div className="flex gap-5 w-full pt-6">
                    <Select
                        label="은행명"
                        id="bankName"
                        name="bankName"
                        value={bankName}
                        options={[
                            { label: "신한은행", value: "신한은행" },
                            { label: "국민은행", value: "국민은행" },
                            { label: "하나은행", value: "하나은행" },
                            { label: "우리은행", value: "우리은행" },
                            { label: "기업은행", value: "기업은행" },
                            { label: "농협은행", value: "농협은행" },
                        ]}
                        placeholder="은행선택"
                        onChange={(value) => setBankName(value)}
                        variant="lg"
                        className="w-full"
                        selectClassName="w-full"
                        labelClassName="font-bold text-sm text-black6 mb-1"
                    />
                    <Select
                        label="상품유형"
                        id="productType"
                        name="productType"
                        value={productType}
                        options={[
                            { label: "예금", value: "DEPOSIT" },
                            { label: "적금", value: "SAVINGS" },
                        ]}
                        placeholder="예금"
                        onChange={(value) => setProductType(value)}
                        variant="lg"
                        className="w-full"
                        selectClassName="w-full"
                        labelClassName="font-bold text-sm text-black6 mb-1"
                    />
                </div>
                <div className="pt-6">
                    <InputField1
                        type="text"
                        label="상품명"
                        id="productName"
                        name="productName"
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="상품명을 입력해주세요. 예) KB Star 정기예금"
                        inputClassName="w-full"
                        labelClassName="block font-bold text-sm text-black6 mb-1"
                        required
                    />
                </div>
                <div className="flex gap-5 w-full pt-6">
                    <InputField1
                        type="text"
                        label="금리"
                        id="interestRate"
                        name="interestRate"
                        value={formatDecimal(interestRate)}
                        onChange={(e) => {
                            const cleaned = formatDecimal(e.target.value);
                            setInterestRate(cleaned);
                        }}
                        placeholder="금리를 입력해주세요. 예) 2.4"
                        className="w-full"
                        inputClassName="w-full"
                        labelClassName="block font-bold text-sm text-black6 mb-1"
                        required
                    />
                    <InputField1
                        type="text"
                        label="가입 금액(원)"
                        id="depositAmount"
                        name="depositAmount"
                        onChange={(e) => {
                            const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                            setDepositAmount(raw); // 실제 저장 값은 쉼표 없는 숫자 문자열
                        }}
                        value={formatNumber(depositAmount)}
                        placeholder="가입 금액을 입력해주세요. 예) 1000000"
                        className="w-full"
                        inputClassName="w-full"
                        labelClassName="block font-bold text-sm text-black6 mb-1"
                        required
                    />
                </div>
                <div className="pt-6">
                    <Select
                        label="가입기간"
                        id="termMonths"
                        name="termMonths"
                        value={termMonths}
                        options={[
                            { label: "6개월", value: "6" },
                            { label: "12개월", value: "12" },
                            { label: "24개월", value: "24" },
                            { label: "36개월", value: "36" },
                        ]}
                        placeholder="가입기간"
                        onChange={(value) => setTermMonths(value)}
                        variant="lg"
                        className="w-full"
                        selectClassName="w-full"
                        labelClassName="font-bold text-sm text-black6 mb-1"
                    />
                </div>
                <div className="flex gap-5 w-full pt-6">
                    <DatePickerInput
                        label="가입일"
                        id="joinDate"
                        name="joinDate"
                        placeholder="가입일을 입력해주세요."
                        value={joinDate}
                        onChange={setJoinDate}
                        required
                        className="w-full"
                        inputClassName="w-full"
                        labelClassName="block font-bold text-sm text-black6 mb-1"
                        maxDate={maturityDate} // 만기일보다 늦게 선택 못 하게 제한
                    />
                    <DatePickerInput
                        label="만기일"
                        id="endDate"
                        name="endDate"
                        placeholder="만기일을 입력해주세요."
                        value={maturityDate}
                        onChange={setMaturityDate}
                        required
                        className="w-full"
                        inputClassName="w-full"
                        labelClassName="block font-bold text-sm text-black6 mb-1"
                        minDate={joinDate} // 시작일보다 빠르게 선택 못 하게 제한
                    />
                </div>
                <div className="max-w-[400px] w-full mx-auto flex gap-2 mt-6">
                    <Button
                        type="button"
                        className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                        onClick={() => navigate(-1)}
                    >
                        이전
                    </Button>
                    <Button
                        type="submit"
                        className="text-white bg-primary"
                    >
                        등록
                    </Button>
                </div>
            </form>
        </>
    )
}
export default UserProductForm;
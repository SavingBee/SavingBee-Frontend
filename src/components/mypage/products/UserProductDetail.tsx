import Button from "@/components/common/button/Button";

interface InfoItem {
    label: string;
    value: string;
}

const infoList: InfoItem[] = [
    { label: '은행명', value: '신한은행' },
    { label: '상품유형', value: '신한은행' },
    { label: '금리', value: '신한은행' },
    { label: '가입 금액(원)', value: '신한은행' },
    { label: '가입 기간', value: '신한은행' },
    { label: '가입일', value: '신한은행' },
    { label: '만기일', value: '신한은행' },
    { label: '메모', value: '신한은행' },
];

const UserProductDetail = () => {
    return (
        <>
            <div className="pb-4 border-t border-t-gray9 border-b border-graye5">
                <strong className="block py-7 mb-5 gmarket font-bold text-2xl border-b border-graye5">
                    상품명
                </strong>
                {infoList.map((item, index) => (
                    <li key={index} className="flex w-full text-sm mb-2">
                        <strong className="block w-[100px] text-black6">{item.label}</strong>
                        <em>{item.value}</em>
                    </li>
                ))}
            </div>
            <div className="max-w-[600px] w-full mx-auto flex gap-2 mt-6">
                <Button
                    type="button"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-black6"
                >
                    이전으로
                </Button>
                <Button
                    type="button"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-primary"
                >
                    수정
                </Button>
                <Button
                    type="button"
                    className="text-white bg-red"
                >
                    삭제
                </Button>
            </div>
        </>
    )
}
export default UserProductDetail;
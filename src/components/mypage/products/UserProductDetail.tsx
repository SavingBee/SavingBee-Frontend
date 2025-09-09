import Button from "@/components/common/button/Button";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import { useDeleteMyProduct } from "@/hooks/mypage/product/useDeleteMyProduct";
import useMyProduct from "@/hooks/mypage/product/useMyProduct";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserProductDetail = () => {
    const { userProductId } = useParams(); // 페이지에 따라 다를 수 있음
    const { data, reload } = useMyProduct();

    const navigate = useNavigate();

    useEffect(() => {
        if (userProductId) {
            reload(userProductId);
        }
    }, [userProductId]);

    // 수정 버튼
    const handleEdit = () => {
        if (!userProductId || !data) return;
        navigate(`/mypage/product/edit/${userProductId}`, { state: { data } });
    };

    // 서버에서 온 실제 데이터 기반으로 infoList 구성
    const infoList = [
        { label: '은행명', value: data?.bankName },
        { label: '상품명', value: data?.productName },
        { label: '상품유형', value: data?.productType },
        { label: '금리', value: `${data?.interestRate}%` },
        { label: '가입 금액(원)', value: data?.depositAmount.toLocaleString() },
        { label: '가입 기간', value: `${data?.termMonths}개월` },
        { label: '가입일', value: data?.joinDate },
        { label: '만기일', value: data?.maturityDate },
        { label: '예상 이자(원)', value: data?.expectedInterest.toLocaleString() },
    ];

    // (마이페이지 보유 상품) 삭제
    const { remove: myProductDelete } = useDeleteMyProduct();

    const handleDelete = async () => {
        if (!userProductId) {
            alert("잘못된 접근입니다. userProductId가 없습니다.");
            return;
        }

        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmed) return;

        myProductDelete(Number(userProductId), () => {
            alert("삭제 완료!");
            window.location.href = "/mypage";
        });
    }


    return (
        <>
            <PageHeader
                title={data?.productName}
                breadcrumb={[
                    { label: "홈", to: "/" },
                    { label: "마이페이지", to: "/mypage" },
                    { label: "보유 상품 상세", to: `/mypage/product/${userProductId}` },
                ]}
            />
            <div className="pb-4 border-t border-t-gray9 border-b border-graye5">
                <strong className="block py-7 mb-5 gmarket font-bold text-2xl border-b border-graye5">
                    {data?.productName}
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
                    onClick={() => navigate(-1)}
                >
                    이전으로
                </Button>
                <Button
                    type="button"
                    className="flex items-center justify-center w-full h-[50px] font-bold text-base rounded-md text-white bg-primary"
                    onClick={handleEdit}
                >
                    수정
                </Button>
                <Button
                    type="button"
                    className="text-white bg-red"
                    onClick={handleDelete}
                >
                    삭제
                </Button>
            </div>
        </>
    )
}
export default UserProductDetail;
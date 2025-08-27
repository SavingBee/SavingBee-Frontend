import ProductListItem from "@/components/product/ProductListItem"

const RecommendList = () => {
    return (
        <ul>
            <ProductListItem
                fin_prdt_cd="SH00001"
                fin_prdt_nm="Sh첫만남우대예금"
                kor_co_nm="SH수협은행"
                max_intr_rate={2.9}
                base_intr_rate={1.85}
                variant="recommend"
                recommendReason="상품명이랑 비교했을 때 추천 1순위 입니다!"
                ownedProductName="내 우대예금"
                expectedInterest={23000}
                interestDiff={3.4}
            />
        </ul>
    )
}
export default RecommendList;
import ProductListItem from "@/components/product/ProductListItem";

const UserProductList = () => {
    return (
        <ul>
            <ProductListItem
                fin_prdt_cd="SH00001"
                fin_prdt_nm="Sh첫만남우대예금"
                kor_co_nm="SH수협은행"
                max_intr_rate={2.9}
                base_intr_rate={1.85}
                variant="mylist"
            />
        </ul>
    )
}
export default UserProductList;
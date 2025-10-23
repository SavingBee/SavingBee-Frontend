import ProductListItem from "@/components/product/ProductListItem";
import { Product } from "@/store/useMyProductStore";

interface Props {
    products?: Product[] | null;
}

const UserProductList = ({ products }: Props) => {
    const reversed = products?.slice().reverse();

    return (
        <div>
            <ul className="space-y-3">
                {products?.length === 0 ? (
                    <li className="w-full py-10 text-center text-sm text-black6">등록된 상품이 없습니다.</li>
                ) : (
                    reversed?.map((item) => (
                        <ProductListItem
                            key={item.userProductId}
                            fin_prdt_cd={String(item.userProductId)}
                            fin_prdt_nm={item.productName}
                            kor_co_nm={item.bankName}
                            max_intr_rate={item.interestRate}
                            base_intr_rate={item.interestRate}
                            variant="mylist"
                        />
                    ))
                )}
            </ul>
        </div>
    )
}
export default UserProductList;
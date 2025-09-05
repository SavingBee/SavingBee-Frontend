import ProductListItem from "@/components/product/ProductListItem";
import { UserProductResponse } from "@/types/product";

interface Props {
    products?: UserProductResponse | null;
}

const UserProductList = ({ products }: Props) => {
    return (
        <div>
            <ul>
                {products?.content.length === 0 ? (
                    <li className="w-full py-10 text-center text-sm text-black6">등록된 상품이 없습니다.</li>
                ) : (
                    products?.content.map((item) => (
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
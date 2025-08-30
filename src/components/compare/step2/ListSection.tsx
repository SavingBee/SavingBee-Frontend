import Pagination from "@/components/common/Pagination";
import ProductList from "@/components/product/ProductList";

import type { ProductListItemProps } from "@/components/product/ProductListItem";
import { CompareListItem } from "@/types/compare";

type ViewItem = ProductListItemProps & { id: string };

const toViewItem = (x: CompareListItem): ViewItem => ({
  id: x.id,
  fin_prdt_cd: x.id,
  fin_prdt_nm: x.productName,
  kor_co_nm: x.bankName,
  base_intr_rate: x.baseRate,
  max_intr_rate: x.maxRate,
});

export default function ListSection({
  items,
  selectedIds,
  onToggleSelect,
  currentPage,
  totalPage,
  onChangePage,
}: {
  items: CompareListItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}) {
  const hasItems = items?.length > 0;
  const viewItems = hasItems ? items.map(toViewItem) : [];

  return (
    <div className="w-full h-2/4">
      <div className="flex justify-between m-2">
        <div className="text-black4 font-bold text-base">추천 상품</div>
        <select className="mr-5 p-1">
          <option>은행 선택</option>
          <option>신한은행</option>
          <option>국민은행</option>
          <option>농협은행</option>
          <option>우리은행</option>
          <option>하나은행</option>
        </select>
      </div>
      <div className="relative mt-2 h-[520px] overflow-y-auto overscroll-contain pr-2">
        {hasItems ? (
          <ProductList
            items={viewItems}
            variant="compare"
            listClassName="m-2"
            selectedIds={selectedIds}
            onCompare={onToggleSelect}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray4 text-lg">
            조건에 맞는 상품이 없습니다.
          </div>
        )}
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            onChange={onChangePage}
          />
        </div>
      </div>
    </div>
  );
}

import Button from "@/components/common/button/Button";
import InputField1 from "@/components/common/input/InputField1";
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
  selectedBank,
  onChangeBank,
  onSubmitSearch,
}: {
  items: CompareListItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  currentPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
  selectedBank: string;
  onChangeBank: (bank: string) => void;
  onSubmitSearch?: () => void;
}) {
  const hasItems = items?.length > 0;
  const viewItems = hasItems ? items.map(toViewItem) : [];

  return (
    <div className="w-full h-2/4 mb-16 md:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between m-2">
        <div className="text-black4 font-bold text-base p-3 pt-0">
          추천 상품
        </div>
        <div className="flex mb-2">
          <InputField1
            type="text"
            placeholder="은행명"
            inputClassName="mr-2 p-1 md:w-64 outline-none"
            value={selectedBank}
            onChange={(e) => onChangeBank(e.target.value)}
          />
          <Button
            type="button"
            styleVariant="bg"
            variant="sm"
            className="bg-primary h-12 w-20"
            onClick={onSubmitSearch}
          >
            검색
          </Button>
        </div>
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

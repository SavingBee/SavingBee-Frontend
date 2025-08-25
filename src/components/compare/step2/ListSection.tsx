import ProductList from "@/components/product/ProductList";
import type { CompareListItem } from "@/mocks/data/compareProduct";
import type { ProductListItemProps } from "@/components/product/ProductListItem";

type ViewItem = ProductListItemProps & { id: string };

const toViewItem = (x: CompareListItem): ViewItem => ({
  id: x.id,
  logo_url: x.logoUrl,
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
}: {
  items: CompareListItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}) {
  const viewItems = items.map(toViewItem);
  return (
    <div className="w-full h-2/4">
      <div className="text-black4 font-bold text-base">추천 상품</div>
      <div className="relative mt-2 h-[520px] overflow-y-auto overscroll-contain pr-2">
        <ProductList
          items={viewItems}
          variant="compare"
          listClassName="m-2"
          selectedIds={selectedIds}
          onCompare={onToggleSelect}
        />
      </div>
    </div>
  );
}

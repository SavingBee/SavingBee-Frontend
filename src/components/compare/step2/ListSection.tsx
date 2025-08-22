import ProductList from "@/components/product/ProductList";
import { ProductListItemProps } from "@/components/product/ProductListItem";

type Item = ProductListItemProps & { id: string };

interface Props {
  items: Item[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export default function ListSection({
  items,
  selectedIds,
  onToggleSelect,
}: Props) {
  return (
    <div className="w-full h-2/4">
      <div className="text-black4 font-bold text-base">추천 상품</div>
      <div className="relative mt-2 h-[520px] overflow-y-auto overscroll-contain pr-2">
        <ProductList
          items={items}
          variant="compare"
          listClassName="m-2"
          selectedIds={selectedIds}
          onCompare={onToggleSelect}
        />
      </div>
    </div>
  );
}

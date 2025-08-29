import ProductListItem, { ProductListItemProps } from "./ProductListItem";
type Item = ProductListItemProps;

type ProductListProps = {
  items: Item[];
  onCompare?: (id: string) => void;
  listClassName?: string;
  variant?: "search" | "compare";
  selectedIds?: string[]; // fin_prdt_cd
  disableItemActions?: boolean;
  onSelect?: (item: Item) => void;
  onClose?: () => void;
};

const ProductList: React.FC<ProductListProps> = ({
  items,
  onCompare,
  listClassName,
  variant = "search",
  selectedIds = [],
  disableItemActions,
  onSelect,
}) => {
  return (
    <ul className={["space-y-3", listClassName].filter(Boolean).join(" ")}>
      {items.map((item) => {
        const code = item.fin_prdt_cd;

        return (
          <ProductListItem
            key={code}
            {...item}
            variant={variant}
            selected={selectedIds.includes(code)}
            onCompare={() => onCompare?.(code)}
            disableActions={disableItemActions}
            onItemClick={() => onSelect?.(item)}
          />
        );
      })}
    </ul>
  );
};

export default ProductList;

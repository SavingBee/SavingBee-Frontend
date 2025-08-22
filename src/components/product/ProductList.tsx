import ProductListItem, { ProductListItemProps } from "./ProductListItem";
type Item = ProductListItemProps & { id: string };

type ProductListProps = {
  items: Item[];
  onCompare?: (id: string) => void;
  listClassName?: string;
  variant?: "search" | "compare";
  selectedIds?: string[];
  disableItemActions?: boolean;
  onSelect?: (item: Item) => void;
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
    <ul className={["space-y-3  ", listClassName].filter(Boolean).join(" ")}>
      {items.map(({ id, ...rest }) => {
        const row: Item = { id, ...rest }; // onSelect로 넘기는 정보
        return (
          <ProductListItem
            key={id}
            {...rest}
            variant={variant}
            selected={selectedIds.includes(id)}
            onCompare={() => onCompare?.(id)}
            disableActions={disableItemActions}
            onItemClick={() => onSelect?.(row)}
          />
        );
      })}
    </ul>
  );
};

export default ProductList;

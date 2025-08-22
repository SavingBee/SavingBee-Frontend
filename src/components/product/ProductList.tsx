import ProductListItem, { ProductListItemProps } from "./ProductListItem";
type Item = ProductListItemProps & { id: string };

type ProductListProps = {
  items: Item[];
  onCompare?: (id: string) => void;
  listClassName?: string;
  variant?: "search" | "compare";
  selectedIds?: string[];
};

const ProductList: React.FC<ProductListProps> = ({
  items,
  onCompare,
  listClassName,
  variant = "search",
  selectedIds = [],
}) => {
  return (
    <ul className={["space-y-3", listClassName].filter(Boolean).join(" ")}>
      {items.map(({ id, ...rest }) => (
        <ProductListItem
          key={id}
          {...rest}
          variant={variant}
          selected={selectedIds.includes(id)}
          onCompare={() => onCompare?.(id)}
        />
      ))}
    </ul>
  );
};

export default ProductList;

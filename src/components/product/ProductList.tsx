import React from "react";
import ProductListItem, { ProductListItemProps } from "./ProductListItem";

type Item = ProductListItemProps & { id: string };

type ProductListProps = {
  items: Item[];
  onCompare?: (id: string) => void;
  listClassName?: string;
};

const ProductList: React.FC<ProductListProps> = ({
  items,
  onCompare,
  listClassName,
}) => {
  return (
    <ul className={["space-y-3  ", listClassName].filter(Boolean).join(" ")}>
      {items.map(({ id, ...rest }) => (
        <ProductListItem key={id} {...rest} onCompare={() => onCompare?.(id)} />
      ))}
    </ul>
  );
};

export default ProductList;

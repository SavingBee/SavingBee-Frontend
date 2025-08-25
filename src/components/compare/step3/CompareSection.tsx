import Button from "@/components/common/button/Button";
import CompareCard from "./CompareCard";
import { ProductType } from "@/types/product";
import { CompareListItem } from "@/mocks/data/compareProduct";

type Item = CompareListItem;
export default function CompareSection({
  items,
  onReset,
  productType,
  rateType,
}: {
  items: Item[];
  onReset: () => void;
  productType: ProductType;
  rateType?: "단리" | "복리";
}) {
  const left = items[0];
  const right = items[1];

  return (
    <div>
      <div className="flex gap-6">
        <CompareCard
          cardNum={0}
          item={left}
          productType={productType}
          rateType={rateType}
        />
        <CompareCard
          cardNum={1}
          item={right}
          productType={productType}
          rateType={rateType}
        />
      </div>
      <div className="flex justify-center leading-none">
        <Button
          type="button"
          variant="sm"
          styleVariant="bg"
          className="bg-black6 mt-3 w-48 h-12"
          onClick={onReset}
          disabled={items.length === 0}
        >
          <span className="text-base">상품 초기화</span>
        </Button>
      </div>
    </div>
  );
}

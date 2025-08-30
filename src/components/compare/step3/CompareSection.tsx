import Button from "@/components/common/button/Button";
import CompareCard from "./CompareCard";
import { ProductType } from "@/types/product";
import { CompareResponseItem } from "@/types/compare";

type Item = CompareResponseItem;

export default function CompareSection({
  items,
  onReset,
  productType,
  rateType,
  winnerId,
}: {
  items: Item[];
  onReset: () => void;
  productType: ProductType;
  rateType?: "단리" | "복리";
  winnerId?: string | null;
}) {
  const left = items[0];
  const right = items[1];

  const higher = (l?: number, r?: number) =>
    l == null || r == null ? "tie" : l > r ? "left" : r > l ? "right" : "tie";

  const highlight =
    left && right
      ? {
          intrRateBeforeTax: higher(
            left.intrRateBeforeTax,
            right.intrRateBeforeTax,
          ),
          intrRateAfterTax: higher(
            left.intrRateAfterTax,
            right.intrRateAfterTax,
          ),
          highestPrefRate: higher(left.highestPrefRate, right.highestPrefRate),
          intrAfterTax: higher(left.intrAfterTax, right.intrAfterTax),
          amountReceived: higher(left.amountReceived, right.amountReceived),
        }
      : undefined;

  return (
    <div>
      <div className="flex gap-6">
        <CompareCard
          cardNum={0}
          item={left}
          productType={productType}
          rateType={rateType}
          isWinner={!!(winnerId && left && left.productId === winnerId)}
          highlight={{
            intrRateBeforeTax: highlight?.intrRateBeforeTax === "left",
            intrRateAfterTax: highlight?.intrRateAfterTax === "left",
            highestPrefRate: highlight?.highestPrefRate === "left",
            intrAfterTax: highlight?.intrAfterTax === "left",
            amountReceived: highlight?.amountReceived === "left",
          }}
        />
        <CompareCard
          cardNum={1}
          item={right}
          productType={productType}
          rateType={rateType}
          isWinner={!!(winnerId && right && right.productId === winnerId)}
          highlight={{
            intrRateBeforeTax: highlight?.intrRateBeforeTax === "right",
            intrRateAfterTax: highlight?.intrRateAfterTax === "right",
            highestPrefRate: highlight?.highestPrefRate === "right",
            intrAfterTax: highlight?.intrAfterTax === "right",
            amountReceived: highlight?.amountReceived === "right",
          }}
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

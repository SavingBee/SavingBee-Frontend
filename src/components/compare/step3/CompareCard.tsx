import Button from "@/components/common/button/Button";
import { CompareResponseItem } from "@/types/compare";
import type { ProductType } from "@/types/product";
import { PiNotePencil } from "react-icons/pi";

export default function CompareCard({
  cardNum,
  item,
  rateType,
  isWinner,
  highlight,
}: {
  cardNum: number;
  item?: CompareResponseItem;
  productType: ProductType;
  rateType?: "단리" | "복리";
  isWinner?: boolean;
  highlight?: {
    intrRateBeforeTax?: boolean;
    intrRateAfterTax?: boolean;
    highestPrefRate?: boolean;
    intrAfterTax?: boolean;
    amountReceived?: boolean;
  };
}) {
  const border = cardNum === 0 ? "border-purple" : "border-cyan";
  const header = cardNum === 0 ? "bg-purple" : "bg-cyan";

  if (!item) {
    return (
      <div className={`border ${border} rounded-lg lg:w-[450px] xl:w-[560px]`}>
        <div className={`${header} h-7 rounded-t-lg`} />
        <div className="p-6 text-center text-gray-400">
          선택된 상품이 없습니다.
        </div>
      </div>
    );
  }

  const intrLabel = item.intrRateType === "S" ? "단리" : "복리";
  const hi = (on?: boolean) => (on ? "font-semibold text-primary" : "");

  return (
    <div
      className={[
        "border rounded-lg md:w-[450px] xl:w-[560px] mb-10 lg:mb-5",
        border,
        isWinner ? "ring-2 ring-primary/40" : "",
      ].join(" ")}
    >
      <div
        className={`${header} h-28 rounded-t-lg flex items-center justify-between px-4`}
      >
        <div className="text-white">
          <div className="text-sm opacity-90">{item.bankName}</div>
          <div className="text-base lg:text-xl font-semibold flex items-center gap-2">
            {item.productName}
            {isWinner && (
              <span className="ml-1 rounded bg-white/15 px-2 py-0.5 text-xs">
                추천
              </span>
            )}
          </div>
        </div>
        <div>
          <Button type="button" className="text-white hover:underline">
            <div className="flex gap-2">
              <PiNotePencil size={17} />
              <span className="text-sm">자세히보기</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="p-5 text-sm">
        <Section title="이자율">
          <Row
            label="세전"
            value={`${item.intrRateBeforeTax.toFixed(2)}%`}
            className={hi(highlight?.intrRateBeforeTax)}
          />
          <Row
            label="세후"
            value={`${item.intrRateAfterTax.toFixed(2)}%`}
            className={hi(highlight?.intrRateAfterTax)}
          />
          <Row
            label="최대 우대금리"
            value={`${item.highestPrefRate.toFixed(2)}%`}
            className={hi(highlight?.highestPrefRate)}
          />
        </Section>

        <Section title="만기시 실수령액">
          <Row
            label="이자"
            value={`${item.intrAfterTax.toLocaleString()}원`}
            className={hi(highlight?.intrAfterTax)}
          />
          <Row
            label="실수령액"
            value={`${item.amountReceived.toLocaleString()}원`}
            className={hi(highlight?.amountReceived)}
          />
        </Section>

        <Section title="이자 계산방식">
          <Row label="계산방식" value={rateType ?? intrLabel} />
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5 last:mb-0">
      <div className="text-base font-bold mb-2 text-gray4">{title}</div>
      <div className="grid grid-cols-2 gap-y-2">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  className,
  dim,
}: {
  label: string;
  value?: string;
  className?: string;
  dim?: boolean;
}) {
  return (
    <>
      <div
        className={["text-gray8", dim && "opacity-60"]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </div>
      <div className={["text-right", className].filter(Boolean).join(" ")}>
        {value ?? "-"}
      </div>
    </>
  );
}

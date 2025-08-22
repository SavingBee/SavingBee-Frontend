import Button from "@/components/common/button/Button";
import { ProductListItemProps } from "@/components/product/ProductListItem";
import type { ProductType } from "@/types/product";
import { PiNotePencil } from "react-icons/pi";

type Item = ProductListItemProps & { id: string };

export default function CompareCard({
  cardNum,
  item,
  productType,
}: {
  cardNum: number;
  item?: Item;
  productType: ProductType;
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

  return (
    <div
      className={`border ${border} rounded-lg md:w-96 lg:w-[450px] xl:w-[560px]`}
    >
      <div
        className={`${header} h-28 rounded-t-lg flex items-center justify-between px-4`}
      >
        <div className="text-white">
          <div className="text-sm opacity-90">{item.bankName}</div>
          <div className="text-xl font-semibold">{item.productName}</div>
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
        {productType === "deposit" ? (
          <>
            <Section title="이자율">
              <Row label="세전" value={`${item.baseRate.toFixed(2)}%`} />
              <Row label="세후" value="-" dim />
              <Row
                label="최대 우대금리"
                value={`${item.maxRate.toFixed(2)}%`}
              />
            </Section>

            <Section title="만기시 실수령액">
              <Row label="이자" value="-" />
              <Row label="실수령액" value="-" highlight />
            </Section>

            <Section title="이자 계산방식">
              <Row label="거치방식" value="거치식" />
              <Row label="복리" value="복리" dim />
            </Section>
          </>
        ) : (
          <>
            <Section title="이자율">
              <Row label="기본" value={`${item.baseRate.toFixed(2)}%`} />
              <Row
                label="최대 우대금리"
                value={`${item.maxRate.toFixed(2)}%`}
              />
              <Row label="적립방식" value="자유/정액 적립" dim />
            </Section>

            <Section title="만기시 실수령액">
              <Row label="이자" value="-" />
              <Row label="실수령액" value="-" highlight />
            </Section>

            <Section title="이자 계산방식">
              <Row label="계산방식" value="단리/복리" />
              <Row label="기본방식" value="기본식" dim />
            </Section>
          </>
        )}
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
  dim,
  highlight,
}: {
  label: string;
  value?: string;
  dim?: boolean;
  highlight?: boolean;
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
      <div
        className={["text-right", highlight && "font-semibold text-primary"]
          .filter(Boolean)
          .join(" ")}
      >
        {value ?? "-"}
      </div>
    </>
  );
}

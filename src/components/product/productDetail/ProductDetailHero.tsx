import type { ProductDetail } from "@/types/productDetail";
// type ProductDetail = {
//   id: string;
//   bankName: string;
//   productName: string;
//   baseRate: number;
//   maxRate: number;
// };
type ProductDetailHeroProps = {
  product: ProductDetail;
};

//api의  interest_rates []  이부분 변환 필요
//기본금리, 최고금리
function pickTopRates(product: ProductDetail) {
  const rates = product.interest_rates ?? [];
  if (!rates.length) return { baseRate: 0, maxRate: 0 };

  const baseRate = Math.max(...rates.map((r) => r.intr_rate));
  const maxRate = Math.max(...rates.map((r) => r.intr_rate2));
  return {
    baseRate: Number.isFinite(baseRate) ? baseRate : 0,
    maxRate: Number.isFinite(maxRate) ? maxRate : 0,
  };
}

export default function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const bankName = product.kor_co_nm;
  const productName = product.fin_prdt_nm;
  const { baseRate, maxRate } = pickTopRates(product);
  return (
    <header className="rounded-2xl bg-primary text-white shadow-md p-6 ">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="text-xs opacity-90">{bankName}</div>
          <h1 className="mt-2 text-2xl font-bold">{productName}</h1>
        </div>
        <div className="flex gap-10 text-right">
          <div>
            <div className="text-xs opacity-80">최고</div>
            <div className="text-2xl font-extrabold">{maxRate}%</div>
          </div>
          <div>
            <div className="text-xs opacity-80">기본</div>
            <div className="text-2xl font-extrabold">{baseRate}%</div>
          </div>
        </div>
      </div>
    </header>
  );
}

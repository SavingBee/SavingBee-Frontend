type ProductDetail = {
  id: string;
  bankName: string;
  productName: string;
  baseRate: number;
  maxRate: number;
};
type ProductDetailHeroProps = {
  product: ProductDetail;
};

export default function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const { id, bankName, productName, baseRate, maxRate } = product;
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

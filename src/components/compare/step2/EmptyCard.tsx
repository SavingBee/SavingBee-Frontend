interface EmptyCardProps {
  cardnum: number;
}

export default function EmptyCard({ cardnum }: EmptyCardProps) {
  const label = cardnum === 0 ? "첫번째" : "두번째";

  return (
    <div className="flex justify-center items-center border m-2 rounded-lg bg-grayf9 w-[399px] h-[212px]">
      <p className="text-black4 text-sm">
        <span className="text-primary font-bold">{label}상품을</span>을
        선택해주세요.
      </p>
    </div>
  );
}

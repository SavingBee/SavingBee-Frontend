import { CompareListItem } from "@/types/compare";
import EmptyCard from "./EmptyCard";
import SelectedCard from "./SelectedCard";
import Button from "@/components/common/button/Button";

type Item = CompareListItem;

export default function CardSection({
  selected,
  onRemove,
  onReset,
  onCompare,
}: {
  selected: Item[];
  onRemove: (id: string) => void;
  onReset: () => void;
  onCompare: () => void;
}) {
  const slots = [0, 1];

  return (
    <div>
      <div className="text-black4 font-bold text-base">선택한 상품</div>
      <div className="flex flex-col justify-center items-center">
        {slots.map((i) => {
          const item = selected[i];
          return item ? (
            <SelectedCard
              key={item.id}
              selectNum={i}
              item={item}
              onClose={() => onRemove(item.id)}
            />
          ) : (
            <EmptyCard key={`empty-${i}`} cardnum={i} />
          );
        })}

        <div className="flex w-[399px]">
          <Button
            type="button"
            styleVariant="bg"
            variant="lg"
            className="bg-black6 !text-base mr-3"
            onClick={onReset}
            disabled={selected.length === 0}
          >
            선택 초기화
          </Button>
          <Button
            type="button"
            styleVariant="bg"
            variant="lg"
            className="bg-primary !text-base"
            onClick={onCompare}
            disabled={selected.length < 2}
          >
            상품 비교하기
          </Button>
        </div>
      </div>
    </div>
  );
}

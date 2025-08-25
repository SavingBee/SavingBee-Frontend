import { ProductType } from "@/types/product";
import Button from "../common/button/Button";

type TabProps = {
  value: ProductType;
  onChange: (v: ProductType) => void;
};

export default function Tab({ value, onChange }: TabProps) {
  const tabs: { key: ProductType; label: string }[] = [
    { key: "deposit", label: "예금" },
    { key: "savings", label: "적금" },
  ];

  return (
    <div className="flex justify-center items-center mb-2">
      {tabs.map((t) => {
        const active = value === t.key;
        return (
          <Button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            styleVariant="border"
            className={`min-w-[72px] p-2 text-base border border-graycc font-semibold !rounded-none
              ${active ? "text-white bg-primary" : " text-gray8"}`}
          >
            {t.label}
          </Button>
        );
      })}
    </div>
  );
}

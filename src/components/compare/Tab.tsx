import { ProductType } from "@/types/product";
import Button from "../common/button/Button";

type TabProps = {
  value: ProductType;
  onChange: (v: ProductType) => void;
};

export default function Tab({ value, onChange }: TabProps) {
  const tabs: { key: ProductType; label: string }[] = [
    { key: "savings", label: "적금" },
    { key: "deposit", label: "예금" },
  ];

  return (
    <div className="flex justify-center items-center  gap-2 mb-2">
      {tabs.map((t) => {
        const active = value === t.key;
        return (
          <Button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            styleVariant="border"
            className={`min-w-[72px] p-2 hover:bg-graye5/30 text-base border-none font-semibold
              ${active ? "text-black" : "text-gray9"}`}
          >
            {t.label}
          </Button>
        );
      })}
    </div>
  );
}

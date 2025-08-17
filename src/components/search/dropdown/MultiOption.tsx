import Checkbox from "@/components/common/input/Checkbox";
import type { Option } from "@/types/searchFilter";

interface MultiOptionProps {
  options: Option[];
  values: string[];
  onChange: (option: string[]) => void;
}

export default function MultiOption({
  options,
  values,
  onChange,
}: MultiOptionProps) {
  const toggle = (id: string) =>
    values.includes(id)
      ? onChange(values.filter((v) => v !== id))
      : onChange([...values, id]);

  return (
    <div className="grid grid-cols-2 gap-y-2 w-[330px]">
      {options.map((o) => (
        <Checkbox
          key={o.id}
          id={o.id}
          name={o.category}
          value={o.id}
          label={o.text}
          checked={values.includes(o.id)}
          onChange={() => toggle(o.id)}
          labelClassName="text-[14px]"
        />
      ))}
    </div>
  );
}

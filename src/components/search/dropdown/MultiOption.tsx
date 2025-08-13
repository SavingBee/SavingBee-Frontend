import type { Option } from "@/types/searchFilter";

type MultiOptionProps = {
  options: Option[];
  values: string[];
  onChange: (option: string[]) => void;
};

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
        <label key={o.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.includes(o.id)}
            onChange={() => toggle(o.id)}
          />
          <span>{o.text}</span>
        </label>
      ))}
    </div>
  );
}

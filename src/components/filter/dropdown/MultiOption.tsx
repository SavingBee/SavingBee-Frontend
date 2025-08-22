import Checkbox from "@/components/common/input/Checkbox";
import type { Option } from "@/types/searchFilter";

interface MultiOptionProps {
  options: Option[];
  values: (string | number)[];
  multiple?: boolean;
  onChange: (vals: (string | number)[]) => void;
}

export default function MultiOption({
  options,
  values,
  multiple = true,
  onChange,
}: MultiOptionProps) {
  const toggle = (id: string | number) => {
    if (multiple) {
      if (values.includes(id)) {
        onChange(values.filter((v) => v !== id));
      } else {
        onChange([...values, id]);
      }
    } else {
      // 단일 선택: 같은 걸 다시 누르면 해제
      onChange(values.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-y-2 w-[330px] pb-4">
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

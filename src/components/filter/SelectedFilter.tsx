import SelectedChip from "./SelectedChip";

type UiChip = { key: string; label: string; onRemove: () => void };

export default function SelectedFilter({ chips }: { chips: UiChip[] }) {
  if (!chips || chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 border-t border-[#B9D4E8] bg-[#F6FAFD] p-4">
      {chips.map((c) => (
        <SelectedChip key={c.key} buttonText={c.label} onClose={c.onRemove} />
      ))}
    </div>
  );
}

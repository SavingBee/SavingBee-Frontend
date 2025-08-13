import SelectedChip from "./SelectedChip";

const BUTTONTEXT = ["금융권", "5,000,000원"];

export default function SelectedFilter() {
  const handleDelete = () => {
    console.log("삭제 기능");
  };

  return (
    <div className="flex gap-2 border-t border-[#B9D4E8] bg-[#F6FAFD] p-4 mt-4">
      {BUTTONTEXT.map((b) => (
        <SelectedChip key={b} buttonText={b} onClose={handleDelete} />
      ))}
    </div>
  );
}

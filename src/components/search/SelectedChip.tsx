import { CgClose } from "react-icons/cg";
import Button from "../common/button/Button";

interface SelectedChipProps {
  buttonText: string;
  onClose: () => void;
}

export default function SelectedChip({
  buttonText,
  onClose,
}: SelectedChipProps) {
  return (
    <div>
      <Button
        type="button"
        variant="sm"
        styleVariant="bg"
        className="!rounded-full bg-navy"
      >
        <span className="inline-flex leading-none gap-2">
          {buttonText}
          <CgClose onClick={onClose} />
        </span>
      </Button>
    </div>
  );
}

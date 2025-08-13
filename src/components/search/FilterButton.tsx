import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../common/button/Button";

interface FilterButtonProps {
  filterText: string;
  isActive?: boolean;
  clickFilter?: () => void;
}

export default function FilterButton({
  filterText,
  isActive,
  clickFilter,
}: FilterButtonProps) {
  return (
    <Button
      type="button"
      variant="sm"
      styleVariant="border"
      className={`mr-2 ${isActive ? "border-primary" : "border-black4"}`}
      onClick={clickFilter}
    >
      <span
        className={`${isActive ? "text-primary" : "text-black4"} inline-flex leading-none gap-2`}
      >
        {filterText}
        {isActive ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </Button>
  );
}

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../common/button/Button";

// FilterButton - 공통
export const filterButtonStyle = [
  "inline-flex items-center gap-1.5  !h-8 px-3 rounded-full",
  "whitespace-nowrap [word-break:keep-all] leading-none",
  "bg-white border-graye5 text-gray7 font-normal hover:bg-grayf9",
  "focus-visible:ring-primary",
  "transition-colors",
].join(" ");

interface FilterButtonProps {
  filterText: string;
  isActive?: boolean;
  // clickFilter?: () => void;
  clickFilter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function FilterButton({
  filterText,
  isActive,
  clickFilter,
}: FilterButtonProps) {
  return (
    <>
      <Button
        type="button"
        variant="sm"
        styleVariant="border"
        className={`${filterButtonStyle} ${isActive ? "border-primary" : "border-graye5"}`}
        onClick={clickFilter}
      >
        <span
          className={`${isActive ? "text-primary" : "text-gray7"} inline-flex leading-none gap-2`}
        >
          {filterText}
          {isActive ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown className="text-gray7 " />
          )}
        </span>
      </Button>
    </>
  );
}

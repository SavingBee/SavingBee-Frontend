import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../common/button/Button";
import React, { forwardRef } from "react";

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
  clickFilter?: React.MouseEventHandler<HTMLButtonElement>;
}

const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ filterText, isActive = false, clickFilter }, _ref) => {
    const handleClick = (clickFilter as unknown as () => void) || undefined;

    return (
      <Button
        type="button"
        variant="sm"
        styleVariant="border"
        className={`${filterButtonStyle} ${isActive ? "border-primary" : "border-graye5"}`}
        onClick={handleClick}
      >
        <span
          className={`${isActive ? "text-primary" : "text-gray7"} inline-flex leading-none gap-2`}
        >
          {filterText}
          {isActive ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown className="text-gray7" />
          )}
        </span>
      </Button>
    );
  },
);
FilterButton.displayName = "FilterButton";
export default FilterButton;

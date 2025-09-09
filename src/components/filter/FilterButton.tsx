import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
      <button
        type="button"
        className={`h-[38px] px-3 font-medium text-sm rounded-md border ${isActive ? "border-primary" : "border-graye5"}`}
        onClick={handleClick}
      >
        <span
          className={`${isActive ? "text-primary" : "text-gray7"} flex items-center gap-2`}
        >
          {filterText}
          {isActive ? (
            <FaChevronUp size={11} />
          ) : (
            <FaChevronDown size={11} className="text-gray7" />
          )}
        </span>
      </button>
    );
  },
);
FilterButton.displayName = "FilterButton";
export default FilterButton;

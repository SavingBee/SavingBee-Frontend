import Button from "../common/button/Button";
import { ReactNode, useMemo, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface CompareLayoutProps {
  no: number;
  sectionTitle: string;
  children?: ReactNode;
  canApply?: boolean;
  onApply?: () => void;
  open?: boolean;
  onToggle?: (next: boolean) => void;
}

export default function CompareLayout({
  no,
  sectionTitle,
  children,
  canApply,
  onApply,
  open,
  onToggle,
}: CompareLayoutProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const alwaysOpen = no === 1;

  const isOpen = useMemo(
    () => (alwaysOpen ? true : (open ?? internalOpen)),
    [alwaysOpen, open, internalOpen],
  );

  const toggle = () => {
    if (alwaysOpen) return;
    if (onToggle) onToggle(!isOpen);
    else setInternalOpen((prev) => !prev);
  };

  return (
    <div onClick={toggle}>
      <div className="flex justify-between my-4">
        <div className="font-bold">
          <span className={`${isOpen ? "text-primary" : "text-gray9"} mr-2`}>
            0{no}
          </span>
          <span className={`${isOpen ? "text-black4" : "text-gray9"}`}>
            {sectionTitle}
          </span>
        </div>

        {canApply ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              type="button"
              variant="sm"
              styleVariant="bg"
              className="bg-primary"
              onClick={onApply}
            >
              적용하기
            </Button>
          </div>
        ) : (
          !alwaysOpen && (
            <Button
              type="button"
              variant="sm"
              styleVariant="border"
              className="text-black6 border-none"
            >
              {isOpen ? <IoChevronUp size={18} /> : <IoChevronDown size={18} />}
            </Button>
          )
        )}
      </div>

      <div
        className={isOpen ? "block" : "hidden"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center my-5">{children}</div>
      </div>
    </div>
  );
}

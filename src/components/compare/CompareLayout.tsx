import Button from "../common/button/Button";

import { ReactNode, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface CompareLayoutProps {
  no: number;
  sectionTitle: string;
  children?: ReactNode;
  canApply?: boolean;
  onApply?: () => void;
}

export default function CompareLayout({
  no,
  sectionTitle,
  children,
  canApply,
  onApply,
}: CompareLayoutProps) {
  const [openSection, setOpenSection] = useState(false);

  return (
    <div onClick={() => setOpenSection((prev) => !prev)}>
      <div className="flex justify-between my-4">
        <div className="font-bold">
          <span
            className={`${openSection ? "text-primary" : "text-gray9"} mr-2`}
          >
            0{no}
          </span>
          <span className={`${openSection ? "text-black4" : "text-gray9"}`}>
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
          <Button
            type="button"
            variant="sm"
            styleVariant="border"
            className="text-black6 border-none"
          >
            {openSection ? (
              <IoChevronUp size={18} />
            ) : (
              <IoChevronDown size={18} />
            )}
          </Button>
        )}
      </div>
      <div
        className={openSection ? "block" : "hidden"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center my-5">{children}</div>
      </div>
    </div>
  );
}

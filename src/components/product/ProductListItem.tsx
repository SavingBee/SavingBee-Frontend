import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import Checkbox from "../common/input/Checkbox";

/**
 * #34A853, #1976D3
 */

export type ProductListItemProps = {
  id?: string; // wrapper에서 key로 씀
  logoUrl: string;
  productName: string;
  bankName: string;
  maxRate: number;
  baseRate: number;
  detail?: string;
  onCompare?: () => void;
  variant?: "search" | "compare";
  selected?: boolean;
};

const ProductListItem: React.FC<ProductListItemProps> = ({
  logoUrl,
  productName,
  bankName,
  maxRate,
  baseRate,

  onCompare,
  selected = false,
  variant = "search",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCompare = variant === "compare";

  return (
    <li
      onClick={() => {
        if (isCompare) onCompare?.();
        else setIsOpen((v) => !v);
      }}
      className={[
        "w-full rounded-xl border bg-white transition-all cursor-pointer",
        isCompare
          ? selected
            ? "border-primary ring-1 ring-primary"
            : "border-gray-200 hover:border-primary/60"
          : "border-gray-200 hover:border-gray-300",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 px-4 h-[100px]">
        {isCompare && (
          <Checkbox
            id={`compare-${productName}`}
            name="compare"
            label=""
            checked={selected}
            onChange={(e) => {
              e.stopPropagation();
              onCompare?.();
            }}
          />
        )}

        <img
          src={logoUrl}
          alt={`${bankName} 로고`}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
        />
        <div className="flex-1 min-w-0 text-left">
          <h3 className="truncate text-base md:text-lg font-semibold">
            {productName}
          </h3>
          <p className="text-sm">{bankName}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <p className="text-xs text-[#1976D3]">우대금리</p>
            <p className="text-lg md:text-2xl font-bold text-[#1976D3]">
              {maxRate.toFixed(2)}%
            </p>
          </div>
          <p className="text-xs text-gray-400">기본 {baseRate}%</p>
        </div>
      </div>

      {/* 아코디언 */}
      {!isCompare && (
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-[#f9f9f9] text-sm text-gray-700 rounded-xl"
          style={{ maxHeight: isOpen ? "50px" : "0px" }}
        >
          <div className="flex items-center justify-between h-[50px] px-4">
            {/* 돋보기 버튼 */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                console.log("상세보기 클릭");
              }}
              className="flex items-center gap-1 text-[#1976D3] hover:underline"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1976D3]">
                <FaSearch size={10} color="#fff" />
              </span>

              <span>상세보기</span>
            </button>

            {/*  + 버튼 */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCompare?.();
              }}
              className="flex items-center gap-1 px-4 py-2 font-bold text-[#34A853] transition-colors hover:underline"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#34A853]">
                <FaPlus size={10} color="#fff" />
              </span>

              {/* 텍스트 */}
              <span>비교함 담기</span>
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ProductListItem;

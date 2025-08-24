import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import Checkbox from "../common/input/Checkbox";

/**
 * #34A853, #1976D3
 */

export type ProductListItemProps = {
  fin_prdt_cd: string; // key
  fin_prdt_nm: string; // 상품명
  kor_co_nm: string; // 은행명
  max_intr_rate: number;
  base_intr_rate: number;
  product_type?: "deposit" | "savings"; // 필요시 분기 처리
  logo_url?: string; //  TODO: API에 추가 가능한지 확인

  onCompare?: () => void;
  variant?: "search" | "compare";
  selected?: boolean;
  //검색 드롭다운 활용위해 확장
  disableActions?: boolean; // 드롭다운일때 내부 버튼 비활성화
  onItemClick?: () => void;
};

const ProductListItem: React.FC<ProductListItemProps> = ({
  logo_url,
  fin_prdt_cd,
  fin_prdt_nm,
  kor_co_nm,
  max_intr_rate,
  base_intr_rate,
  product_type,

  onCompare,
  selected = false,
  variant = "search",
  disableActions,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCompare = variant === "compare";

  function handleClick() {
    if (isCompare) {
      onCompare?.();
      return;
    }
    if (disableActions) {
      // 드롭다운 모드일 때는 바로 외부 콜백만 실행
      onItemClick?.();
      return;
    }
    // 기본 모드일 때만 버튼 토글 유지
    setIsOpen((v) => !v);
  }

  const containerClass = [
    "w-full rounded-xl bg-white transition-all cursor-pointer",
    "border",
    isCompare
      ? selected
        ? "border-primary ring-1 ring-primary"
        : "border-gray-200 hover:border-primary/60"
      : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
  ].join(" ");

  return (
    <li onClick={handleClick} className={containerClass}>
      <div className="flex items-center gap-4 px-4 h-[100px]">
        {isCompare && (
          <Checkbox
            id={`compare-${fin_prdt_nm}`}
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
          src={logo_url}
          alt={`${kor_co_nm} 로고`}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
        />
        <div className="flex-1 min-w-0 text-left">
          <h3 className="truncate text-base md:text-lg font-semibold">
            {fin_prdt_nm}
          </h3>
          <p className="text-sm">{kor_co_nm}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            {/* <p className="text-xs text-[#1976D3]">우대금리</p> */}
            <p className="text-lg md:text-2xl font-bold text-[#1976D3]">
              {max_intr_rate}%
            </p>
          </div>
          <p className="text-xs text-gray-400">기본 {base_intr_rate}%</p>
        </div>
      </div>

      {/* 아코디언  --- disableActions 일때, 렌더 막기 */}
      {variant === "search" && !disableActions && (
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

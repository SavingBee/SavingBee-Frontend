import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import Checkbox from "@/components/common/input/Checkbox";
import IcnButton from "@/components/common/button/IcnButton";
import { LuDot } from "react-icons/lu";
import BankLogo from "@/components/product/BankLogo";

/**
 * #34A853, #1976D3
 */

export type ProductListItemProps = {
  fin_prdt_cd: string; // id
  fin_prdt_nm: string;
  kor_co_nm: string;
  max_intr_rate: number;
  base_intr_rate: number;
  product_type?: "deposit" | "savings"; // 필요시 분기 처리

  onCompare?: () => void;
  variant?: "search" | "compare" | "mylist" | "recommend";
  selected?: boolean;
  //검색 드롭다운 활용위해 확장
  disableActions?: boolean;
  onItemClick?: () => void;

  // 추천상품 리스트
  recommendReason?: string;
  ownedProductName?: string;
  expectedInterest?: number;
  interestDiff?: number;
};

const ProductListItem: React.FC<ProductListItemProps> = ({
  // logo_url,
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

  recommendReason,
  ownedProductName,
  expectedInterest,
  interestDiff,
}) => {
  const navigate = useNavigate();
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
    // 기본 모드일 때만 버튼 토글 유지 , 상세페이지 이동
    setIsOpen((v) => !v);
    navigate(`/products/${encodeURIComponent(fin_prdt_cd)}`);
    // console.log(fin_prdt_cd);
  }

  const containerClass = [
    "w-full bg-white transition-all cursor-pointer",
    disableActions ? "border-b border-gray-200" : "border rounded-xl",
    isCompare
      ? selected
        ? "border-primary ring-1 ring-primary"
        : "border-gray-200 hover:border-primary/60"
      : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
  ].join(" ");

  return (
    <li onClick={handleClick} className={containerClass}>
      <div className="flex items-center gap-4 px-6 h-[100px]">
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
        {/* 은행 로고 */}
        <div className="h-10 w-10 rounded-full overflow-hidden border border-graye5">
          <BankLogo
            korCoName={kor_co_nm}
            className="object-cover ring-1 ring-gray-200 w-10 h-10 rounded"
            variant="random" // hash
          />
        </div>
        <div className="flex-1 min-w-0 text-left">
          {/* 추천 상품 리스트 일 때 */}
          {variant === "recommend" && (
            <span className="font-bold text-xs text-primary">
              {recommendReason}
            </span>
          )}
          {/* 상품명 */}
          <h3 className="truncate text-base md:text-lg font-bold">
            {fin_prdt_nm}
          </h3>
          {/* 은행명 */}
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

      {/* 추천 상품 리스트 일 때 */}
      {variant === "recommend" && (
        <div className="flex items-center flex-wrap gap-1 border-t border-graye5 mx-6 py-3">
          <div className="flex gap-2 text-sm">
            <span>보유 상품</span>
            <strong className="font-semibold">{ownedProductName}</strong>
          </div>
          <span>
            <LuDot color="#999" />
          </span>
          {expectedInterest !== undefined && (
            <div className="flex gap-2 text-sm">
              <span>예상 추가 이자(연간)</span>
              <strong className="font-semibold">
                {expectedInterest.toLocaleString()}원
              </strong>
            </div>
          )}
          <span>
            <LuDot color="#999" />
          </span>
          {interestDiff !== undefined && (
            <div className="flex gap-2 text-sm">
              <span>상품 대비 금리 차이</span>
              <strong className="font-semibold">{interestDiff}%</strong>
            </div>
          )}
        </div>
      )}

      {["search", "mylist", "recommend"].includes(variant) &&
        !disableActions && (
          <div
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-[#f9f9f9] text-sm text-gray-700 rounded-xl rounded-t-none"
            style={{ maxHeight: isOpen ? "50px" : "0px" }}
          >
            <div className="flex items-center justify-between h-[50px] px-4">
              {variant === "search" && (
                <>
                  {/* 돋보기 버튼 */}
                  <IcnButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("상세보기 클릭");
                    }}
                    icon={<FaSearch size={10} color="#fff" />}
                    className="text-primary"
                    iconClassName="bg-primary"
                  >
                    상세보기
                  </IcnButton>

                  {/* 비교함 담기 버튼 */}
                  <IcnButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompare?.();
                    }}
                    icon={<FaPlus size={10} color="#fff" />}
                    className="text-green"
                    iconClassName="bg-green"
                  >
                    비교함 담기
                  </IcnButton>
                </>
              )}

              {/* 마이페이지 내 상품 리스트 일 때 */}
              {variant === "mylist" && (
                <>
                  <IcnButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("상세보기 클릭");
                    }}
                    icon={<FaSearch size={10} color="#fff" />}
                    className="text-primary"
                    iconClassName="bg-primary"
                  >
                    상세보기
                  </IcnButton>
                  <div className="flex items-center justify-between gap-3">
                    <IcnButton
                      type="button"
                      className="text-green"
                      iconClassName="bg-green"
                      icon={<FaSearch size={10} color="#fff" />}
                    >
                      수정
                    </IcnButton>
                    <IcnButton
                      type="button"
                      className="text-red"
                      iconClassName="bg-red"
                      icon={<FaSearch size={10} color="#fff" />}
                    >
                      삭제
                    </IcnButton>
                  </div>
                </>
              )}

              {/* 추천 상품 리스트일 때 */}
              {variant === "recommend" && (
                <>
                  {/* 돋보기 버튼 */}
                  <IcnButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("상세보기 클릭");
                    }}
                    icon={<FaSearch size={10} color="#fff" />}
                    className="text-primary"
                    iconClassName="bg-primary"
                  >
                    상세보기
                  </IcnButton>

                  {/* 비교함 담기 버튼 */}
                  <IcnButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCompare?.();
                    }}
                    icon={<FaPlus size={10} color="#fff" />}
                    className="text-green"
                    iconClassName="bg-green"
                  >
                    비교함 담기
                  </IcnButton>
                </>
              )}
            </div>
          </div>
        )}

      {/* 아코디언  --- disableActions 일때, 렌더 막기 */}
      {/* {variant === "search" && !disableActions && (
        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-[#f9f9f9] text-sm text-gray-700 rounded-xl"
          style={{ maxHeight: isOpen ? "50px" : "0px" }}
        >
          <div className="flex items-center justify-between h-[50px] px-4"> */}
      {/* 돋보기 버튼 */}
      {/* <button
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
            </button> */}

      {/*  + 버튼 */}
      {/* <button
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

              <span>비교함 담기</span>
            </button> */}

      {/* 
          </div>
        </div>
      )} */}
    </li>
  );
};

export default ProductListItem;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import Checkbox from "@/components/common/input/Checkbox";
import IcnButton from "@/components/common/button/IcnButton";
import { LuDot } from "react-icons/lu";
import BankLogo from "@/components/product/BankLogo";
import { useDeleteMyProduct } from "@/hooks/mypage/product/useDeleteMyProduct";
import { useAddCart } from "@/hooks/cart/useAddCartItem";
import { AddCartRequest } from "@/api/cart/addCartItem";
import { CartItem } from "@/types/cart";
import { format } from "date-fns";
import useAuthHeader from "@/hooks/auth/useAuthHeader";

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
  variant?: "search" | "compare" | "mylist" | "recommend" | "productSearch";
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
  // onItemClick,

  recommendReason,
  ownedProductName,
  expectedInterest,
  interestDiff,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isCompare = variant === "compare";

  // 로그인 여부 확인
  const isLoggedIn = useAuthHeader();

  function handleClick() {
    if (isCompare) {
      onCompare?.();
      return;
    }

    // 드롭다운은 compare, mylist일 때 열기
    if (["compare", "mylist", "productSearch"].includes(variant as string)) {
      setIsOpen((v) => !v);
    }

    // 이동은 나머지일 때만
    if (!["compare", "mylist", "productSearch"].includes(variant as string) && !disableActions) {
      navigate(`/products/${encodeURIComponent(fin_prdt_cd)}`);
    }
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

  // (마이페이지 보유 상품) 삭제
  const { remove: myProductDelete } = useDeleteMyProduct();

  // 보관함 넣기
  const { add, error: cartError } = useAddCart();
  useEffect(() => {
    if (cartError) {
      alert(cartError);
    }
  }, [cartError]);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const productType: "DEPOSIT" | "SAVINGS" =
      product_type === "deposit" ? "DEPOSIT" : "SAVINGS";

    const payload: AddCartRequest = {
      productCode: String(fin_prdt_cd),
      productType,
    };

    console.log("[addCart] payload:", payload);

    add({
      productCode: String(fin_prdt_cd),
      productType: (product_type === "deposit" ? "DEPOSIT" : "SAVINGS") as "DEPOSIT" | "SAVINGS",
    });
  };

  const handleAddToCartToLocalStorage = (e: React.MouseEvent) => {
    e.stopPropagation();

    const productType: "DEPOSIT" | "SAVINGS" =
      product_type === "deposit" ? "DEPOSIT" : "SAVINGS";

    const cartItem: CartItem = {
      cartId: Date.now(), // 임시 ID
      productCode: fin_prdt_cd,
      productType,
      bankName: kor_co_nm,
      productName: fin_prdt_nm,
      maxInterestRate: max_intr_rate,
      termMonths: 0, // termMonths 정보가 없다면 0 또는 입력 받는 곳에서 설정
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    // 기존 localStorage에서 데이터 가져오기
    const existing = localStorage.getItem("compareCart");
    const parsed: CartItem[] = existing ? JSON.parse(existing) : [];

    // 중복 체크
    const isDuplicate = parsed.some(
      (item) =>
        item.productCode === cartItem.productCode &&
        item.productType === cartItem.productType
    );
    if (isDuplicate) {
      alert("이미 비교함에 담긴 상품입니다.");
      return;
    }

    // 추가 후 저장
    const updated = [...parsed, cartItem];
    localStorage.setItem("compareCart", JSON.stringify(updated));
    alert("비교함에 담겼습니다!");

    window.location.reload();
  };




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

      {["productSearch", "mylist", "recommend"].includes(variant) &&
        !disableActions && (
          <div
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out bg-[#f9f9f9] text-sm text-gray-700 rounded-xl rounded-t-none"
            style={{ maxHeight: isOpen ? "50px" : "0px" }}
          >
            <div className="flex items-center justify-between h-[50px] px-5">
              {variant === "productSearch" && (
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
                    onClick={isLoggedIn === true ? handleAddToCart : handleAddToCartToLocalStorage}
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
                      navigate(`/mypage/product/${encodeURIComponent(fin_prdt_cd)}`);
                    }}
                    icon={<FaSearch size={10} color="#fff" />}
                    className="text-primary"
                    iconClassName="bg-primary"
                  >
                    상세보기
                  </IcnButton>
                  <div className="flex items-center justify-between gap-4">
                    <IcnButton
                      type="button"
                      className="text-green"
                      iconClassName="bg-green"
                      icon={<FaSearch size={10} color="#fff" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/mypage/product/edit/${encodeURIComponent(fin_prdt_cd)}`);
                      }}
                    >
                      수정
                    </IcnButton>
                    <IcnButton
                      type="button"
                      className="text-red"
                      iconClassName="bg-red"
                      icon={<FaSearch size={10} color="#fff" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        const confirmed = window.confirm("정말 삭제하시겠습니까?");
                        if (!confirmed) return;

                        myProductDelete(fin_prdt_cd, () => {
                          alert("삭제 완료!");
                          window.location.reload(); // 페이지 새로고침
                        });
                      }}
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
    </li>
  );
};

export default ProductListItem;

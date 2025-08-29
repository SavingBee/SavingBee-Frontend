import axios from "axios";
import type {
  ProductDetail,
  DepositProductDetail,
  SavingsProductDetail,
} from "@/types/productDetail";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET /products/{product_id}
export const API_PRODUCT_DETAIL = "/products";
const api = axios.create({
  baseURL: API_BASE_URL || "",
  headers: { "Content-Type": "application/json" },
});

export async function getProductDetail(
  productId: string,
): Promise<ProductDetail> {
  const id = (productId ?? "").trim();
  if (!id) {
    throw new Error("product_id가 비어 있습니다.");
  }

  const res = await api.get<ProductDetail>(
    `${API_PRODUCT_DETAIL}/${encodeURIComponent(id)}`,
  );
  return res.data;
}

/** 타입 가드: 예금 상세 */
export function isDepositDetail(
  detail: ProductDetail,
): detail is DepositProductDetail {
  return detail.product_type === "deposit";
}

/** 타입 가드: 적금 상세 */
export function isSavingDetail(
  detail: ProductDetail,
): detail is SavingsProductDetail {
  return detail.product_type === "saving";
}

import { getMyProducts } from "@/api/mypage/product/getMyProducts";
import { AxiosError } from "axios";
import { create } from "zustand";

export type Product = {
    userProductId: string;           // 상품 식별자
    userId: number;                  // 사용자 식별자
    bankName: string;                // 은행명 (예: "국민은행")
    productName: string;             // 상품명 (예: "KB스타 건강적금")
    productType: "SAVINGS" | "DEPOSIT"; // 상품유형 (적금/예금 등)
    depositAmount: string;           // 예치금액 (원)
    interestRate: number;            // 금리 (%)
    expectedInterest: string;        // 예상이자액 (원)
    termMonths: string;              // 기간(개월)
    joinDate: string;                // 가입일 (ISO 날짜 문자열)
    maturityDate: string;            // 만기일 (ISO 날짜 문자열)
    daysToMaturity: string;          // 만기까지 남은 일수
    maturityStatus: "ACTIVE" | "NEAR_MATURITY" | "EXPIRED"; // 상태 구분
    isActive: boolean;               // 활성 상태 여부
    specialConditions: string | null;// 우대조건
    createdAt: string;               // 생성일 (ISO 날짜 문자열)
    updatedAt: string;               // 수정일 (ISO 날짜 문자열)
};

type ProductState = {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    addProduct: (p: Product) => void;
    updateProduct: (id: string, data: Partial<Product>) => void;
    removeProduct: (id: string) => void;
};

export const useProductStore = create<ProductState>()((set) => {
    const fetchProducts = async () => {
        set({ loading: true, error: null });
        try {
            const res = await getMyProducts();
            set({ products: res.data.content, loading: false });
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            set({
                error: axiosError.response?.data?.message || "상품 목록을 가져오지 못했습니다.",
                loading: false,
            });
        }
    };

    return {
        products: [],
        loading: false,
        error: null,
        fetchProducts,
        addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
        updateProduct: (id, data) =>
            set((s) => ({
                products: s.products.map((p) =>
                    p.userProductId === id ? { ...p, ...data } : p
                ),
            })),
        removeProduct: (id) =>
            set((s) => ({
                products: s.products.filter((p) => p.userProductId !== id),
            })),
    };
});
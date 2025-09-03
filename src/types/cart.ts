export type CartItem = {
    cartId: number;
    productCode: string;
    productType: "DEPOSIT" | "SAVINGS";
    bankName: string;
    productName: string;
    maxInterestRate: number;
    termMonths: number;
    createdAt: string;
};

export type CartListResponse = {
    content: CartItem[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    message?: string;
};
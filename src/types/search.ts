//검색 응답 정의
export type Product = {
  fin_prdt_cd: string;
  fin_prdt_nm: string;
  kor_co_nm: string;
  product_type: "deposit" | "savings";
  max_intr_rate: number;
  base_intr_rate: number;
  logo_url?: string; // TODO: 추가여부확인
};

export type SearchSuccess = {
  products: Product[];
  totalCount: number;
  searchTerm: string;
};

export type SearchWithPopular = {
  products: [];
  popularProducts: Product[];
  totalCount: 0;
  searchTerm: string;
  message?: string;
};

export type SearchError = {
  error: string;
};

export type SearchResponse = SearchSuccess | SearchWithPopular;

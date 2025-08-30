import api from "./api";
import type {
  CompareListItem,
  CompareListQuery,
  CompareListResponse,
  CompareRequest,
  CompareResponse,
  // GetCompareResponse,
} from "@/types/compare";

const bankLogo = (bankName: string) =>
  `/assets/banks/${encodeURIComponent(bankName)}.png`;

const mapResponseToItem = (r: CompareListResponse): CompareListItem => ({
  id: r.productId,
  logoUrl: bankLogo(r.bankName),
  productName: r.productName,
  bankName: r.bankName,
  baseRate: r.intrRate,
  maxRate: r.intrRate2,
});

type CompareListPage = { content: CompareListResponse[] };

export async function getCompareProduct(
  params: CompareListQuery,
): Promise<CompareListItem[]> {
  const { data } = await api.get<CompareListPage>("/api/compare", {
    params,
  });
  console.log(data, "data 가져온값");
  const list = Array.isArray(data?.content) ? data.content : [];
  return list.map(mapResponseToItem);
}

// export async function getCompareProduct(params: CompareListQuery): Promise<{
//   items: CompareListItem[];
//   page: number;
//   size: number;
//   totalPages: number;
//   totalElements: number;
// }> {
//   const { data } = await api.get<GetCompareResponse>("/api/compare", {
//     params,
//   });

//   const items = (data?.content ?? []).map(mapResponseToItem);

//   const size = data?.size ?? params.size ?? 20;
//   const totalElements = data?.totalElements ?? 0;
//   const totalPages = Math.max(1, Math.ceil(totalElements / size));

//   return {
//     items,
//     page: (data?.page ?? 0) + 1,
//     size,
//     totalPages,
//     totalElements,
//   };
// }

export async function compareProduct(
  products: CompareRequest,
): Promise<CompareResponse> {
  const { data } = await api.post("/api/compare", products, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

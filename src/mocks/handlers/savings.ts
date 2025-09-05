// import { http, HttpResponse } from "msw";
// import { products } from "../data/products";

// // 단일 핸들러 export (배열 아님)
// export const savingsHandler = http.get(
//   "/products/filter/saving",
//   ({ request }) => {
//     const url = new URL(request.url);
//     const q = (url.searchParams.get("q") ?? "").trim();
//     const page = Number(url.searchParams.get("page") ?? "1");
//     const pageSize = Number(url.searchParams.get("pageSize") ?? "20");

//     let list = products;

//     //소문자 비교
//     const lower = (s: string) => (s ?? "").toLocaleLowerCase();
//     if (q) {
//       const qn = lower(q);
//       list = list.filter(
//         (p) =>
//           lower(p.fin_prdt_nm).includes(qn) || lower(p.kor_co_nm).includes(qn),
//       );
//     }

//     const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
//     const start = (page - 1) * pageSize;
//     const items = list.slice(start, start + pageSize);

//     return HttpResponse.json({ items, totalPages });
//   },
// );

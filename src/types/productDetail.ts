//  /api/products/:id 엔드포인트

// {
//     "id": "sh-1001",
//     "bankName": "SH수협은행",
//     "productName": "Sh첫만남우대예금",
//     "baseRate": 0.02,
//     "maxRate": 0.0256,
//     "noticeMonth": "2025년 8월",
//     "financeCompany": "SH수협은행",
//     "financeProduct": "Sh첫만남우대예금",
//     "periodMonths": 12,
//     "interestType": "고정금리"
//   }

export type ProductDetail = {
  id: string;
  bankName: string;
  productName: string;
  baseRate: number;
  maxRate: number;
  noticeMonth: string;
  financeCompany: string;
  financeProduct: string;
  periodMonths: number;
  interestType: string;
};

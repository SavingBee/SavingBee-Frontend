export const DEPOSIT_PRODUCTS = [
  {
    id: "DEP001", // fin_prdt_cd
    name: "스마트예금", // fin_prdt_nm
    bankCode: "KB", // fn_co_no
    bankName: "국민은행", // kor_co_nm (조인 결과를 미리 넣어도 OK)
    joinWay: "인터넷/모바일",
    joinMember: "개인",
    isActive: true,
    updatedAt: "2025-08-11T02:10:00Z",
    notes: "중도해지시 약정금리 미적용",
  },
  {
    id: "DEP002",
    name: "하이이자 예금",
    bankCode: "SH",
    bankName: "신한은행",
    joinWay: "모바일",
    joinMember: "개인/개인사업자",
    isActive: true,
    updatedAt: "2025-08-10T10:00:00Z",
    notes: "우대금리 충족 시 최대금리 적용",
  },
];

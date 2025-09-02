export const formatNumber = (value?: number) => {
  if (value == null) return "";
  return value.toLocaleString("ko-KR");
};

export const parseNumber = (raw: string) => {
  const s = String(raw).replace(/,/g, "").trim();
  if (s === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
};

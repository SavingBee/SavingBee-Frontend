export const LIST_KEY_MAP: Record<string, string> = {
  bankType: "finCoType",
  benefit: "joinWay",
  target: "joinDeny",
  term: "saveTrm",
  interestType: "intrRateType",
  //rsrvType
};

export function mapListKeys(lists: Record<string, string[] | undefined>) {
  const out: Record<string, string> = {};
  Object.entries(lists || {}).forEach(([uiKey, arr]) => {
    const apiKey = LIST_KEY_MAP[uiKey];
    if (!apiKey) return;
    if (arr && arr.length > 0) out[apiKey] = arr.join(",");
  });
  return out;
}

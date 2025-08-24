export type ListChip = {
  kind: "list";
  key: "finCoType" | "joinWay" | "joinDeny" | "saveTrm" | "intrRateType";
  value: string;
};

export type AmountChip = {
  kind: "amount";
  key: "monthlyMaxLimit" | "totalMaxLimit";
  label?: string;
};

export type RangeChip = {
  kind: "range";
  minKey: "intrRateMin" | "intrRate2Min" | "maxLimitMin";
  maxKey: "intrRateMax" | "intrRate2Max" | "maxLimitMax";
  label?: string;
};

export type Chip = ListChip | AmountChip | RangeChip;

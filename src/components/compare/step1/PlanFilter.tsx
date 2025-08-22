import { ProductType } from "@/types/product";
import { DepositField } from "./DepositField";
import { SavingField } from "./SavingField";

export type SavingsFilter = {
  amount?: number;
  months?: number;
  rate?: number;
  rateType?: "단리" | "복리" | "";
};

export type DepositFilter = {
  principal?: number;
  rate?: number;
};

type PlanFilterProps = {
  kind: ProductType;
  onChange?: (filter: SavingsFilter | DepositFilter, valid: boolean) => void;
};

export default function PlanFilter({ kind, onChange }: PlanFilterProps) {
  return kind === "savings" ? (
    <SavingField onChange={onChange} />
  ) : (
    <DepositField onChange={onChange} />
  );
}

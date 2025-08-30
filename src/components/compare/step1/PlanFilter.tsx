import { ProductType } from "@/types/product";
import { DepositField } from "./DepositField";
import { SavingField } from "./SavingField";
import { DepositFilter, SavingsFilter } from "@/types/compare";

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

import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import CompareLayout from "@/components/compare/CompareLayout";
import Tab from "@/components/compare/Tab";

import type { ProductListItemProps } from "@/components/product/ProductListItem";
import {
  depositCompareData,
  savingsCompareData,
} from "@/mocks/data/compareProduct";
import PlanFilter, {
  DepositFilter,
  SavingsFilter,
} from "@/components/compare/step1/PlanFilter";
import ListSection from "@/components/compare/step2/ListSection";
import CardSection from "@/components/compare/step2/CardSection";
import CompareSection from "@/components/compare/step3/CompareSection";

type Item = ProductListItemProps & { id: string };

export default function ProductComparePage() {
  const [kind, setKind] = useState<ProductType>("savings");
  const [planValid, setPlanValid] = useState(false);
  const [, setPlanFilter] = useState<SavingsFilter | DepositFilter>({});

  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item[]>([]);
  const selectedIds = selected.map((x) => x.id);

  const [compareItems, setCompareItems] = useState<Item[]>([]);

  const handleTabChange = (v: ProductType) => {
    setKind(v);
    setPlanValid(false);
    setPlanFilter({});
    setSelected([]);
    setCompareItems([]);
    setVisibleItems(v === "savings" ? savingsCompareData : depositCompareData);
  };
  useEffect(() => {
    setVisibleItems(
      kind === "savings" ? savingsCompareData : depositCompareData,
    );
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const exists = prev.find((x) => x.id === id);
      if (exists) return prev.filter((x) => x.id !== id);
      if (prev.length >= 2) return prev;
      const item = visibleItems.find((x) => x.id === id);
      return item ? [...prev, item] : prev;
    });
  };

  const removeSelected = (id: string) =>
    setSelected((prev) => prev.filter((x) => x.id !== id));

  const resetSelected = () => setSelected([]);

  const submitCompare = () => {
    setCompareItems(selected);
    document
      .getElementById("compare-anchor")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const resetCompare = () => setCompareItems([]);

  return (
    <div>
      <PageHeader
        title="상품비교"
        breadcrumb={[{ label: "홈", to: "/" }, { label: "상품비교" }]}
      />

      <Tab value={kind} onChange={handleTabChange} />

      <CompareLayout
        no={1}
        sectionTitle="저축계획을 입력해주세요."
        canApply={planValid}
        onApply={() => {
          setVisibleItems(
            kind === "savings" ? savingsCompareData : depositCompareData,
          );
        }}
      >
        <PlanFilter
          kind={kind}
          onChange={(f, valid) => {
            setPlanFilter(f);
            setPlanValid(valid);
          }}
        />
      </CompareLayout>

      <CompareLayout no={2} sectionTitle="상품을 선택해주세요.">
        <ListSection
          items={visibleItems}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
        />
        <CardSection
          selected={selected}
          onRemove={removeSelected}
          onReset={resetSelected}
          onCompare={submitCompare}
        />
      </CompareLayout>

      <div id="compare-anchor">
        <CompareLayout no={3} sectionTitle="선택한 상품을 비교해보세요!">
          <CompareSection
            items={compareItems}
            productType={kind}
            onReset={() => {
              resetCompare();
              resetSelected();
            }}
          />
        </CompareLayout>
      </div>
    </div>
  );
}

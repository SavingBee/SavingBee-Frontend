import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import CompareLayout from "@/components/compare/CompareLayout";
import Tab from "@/components/compare/Tab";
import {
  CompareListItem,
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

type Item = CompareListItem;

export default function ProductComparePage() {
  const [kind, setKind] = useState<ProductType>("deposit");
  const [planValid, setPlanValid] = useState(false);
  const [, setPlanFilter] = useState<SavingsFilter | DepositFilter>({});
  const [plan, setPlan] = useState<SavingsFilter | DepositFilter>({});

  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item[]>([]);
  const selectedIds = selected.map((x) => x.id);

  const [compareItems, setCompareItems] = useState<Item[]>([]);

  const [openSections, setOpenSections] = useState<{ 2: boolean; 3: boolean }>({
    2: false,
    3: false,
  });

  const planRateType = (plan as SavingsFilter).rateType;
  const normalizedRateType: "단리" | "복리" | undefined =
    planRateType === "단리" || planRateType === "복리"
      ? planRateType
      : undefined;

  const handleTabChange = (v: ProductType) => {
    setKind(v);
    setPlanValid(false);
    setPlanFilter({});
    setSelected([]);
    setCompareItems([]);
    setVisibleItems(v === "savings" ? savingsCompareData : depositCompareData);
    setOpenSections({ 2: false, 3: false });
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
    setOpenSections((s) => ({ ...s, 3: true }));
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
          setOpenSections((s) => ({ ...s, 2: true }));
        }}
      >
        <PlanFilter
          kind={kind}
          onChange={(f, valid) => {
            setPlan(f);
            setPlanFilter(f);
            setPlanValid(valid);
          }}
        />
      </CompareLayout>

      <CompareLayout
        no={2}
        sectionTitle="상품을 선택해주세요."
        open={openSections[2]}
        onToggle={(next) => setOpenSections((s) => ({ ...s, 2: next }))}
      >
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
        <CompareLayout
          no={3}
          sectionTitle="선택한 상품을 비교해보세요!"
          open={openSections[3]}
          onToggle={(next) => setOpenSections((s) => ({ ...s, 3: next }))}
        >
          <CompareSection
            items={compareItems}
            productType={kind}
            rateType={kind === "savings" ? normalizedRateType : undefined}
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

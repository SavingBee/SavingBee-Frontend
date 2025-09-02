import { useCallback, useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import PageHeader from "@/components/common/pageHeader/PageHeader";
import CompareLayout from "@/components/compare/CompareLayout";
import Tab from "@/components/compare/Tab";
import PlanFilter from "@/components/compare/step1/PlanFilter";
import ListSection from "@/components/compare/step2/ListSection";
import CardSection from "@/components/compare/step2/CardSection";
import CompareSection from "@/components/compare/step3/CompareSection";
import { compareProduct, getCompareProduct } from "@/api/compare";
import {
  CompareListItem,
  SavingsFilter,
  DepositFilter,
  CompareRequest,
  CompareResponseItem,
  CompareListQuery,
} from "@/types/compare";

type Item = CompareListItem;

const uniqBy = <T, K>(arr: T[], key: (t: T) => K) =>
  Array.from(new Map(arr.map((x) => [key(x), x])).values());

const toApiRateType = (rt?: "단리" | "복리") => (rt === "복리" ? "M" : "S");

const buildCompareBody = (
  kind: ProductType,
  plan: SavingsFilter | DepositFilter,
  selectedIds: string[],
): CompareRequest => {
  const isSavings = kind === "savings";
  const amount = isSavings
    ? ((plan as SavingsFilter).amount ?? 0)
    : ((plan as DepositFilter).principal ?? 0);

  return {
    productIds: selectedIds,
    type: isSavings ? "S" : "D",
    amount,
    termMonth: (plan.months ?? 12) as 6 | 12 | 24 | 36,
    intrRateType: toApiRateType(plan.rateType),
  };
};

const buildListQuery = (
  kind: ProductType,
  plan: SavingsFilter | DepositFilter,
  page: number,
  size = 20,
  bankKeyword?: string,
): CompareListQuery => {
  const isSavings = kind === "savings";
  const p = plan as SavingsFilter | DepositFilter;

  return {
    type: isSavings ? "S" : "D",
    amount: isSavings
      ? ((p as SavingsFilter).amount ?? 0)
      : ((p as DepositFilter).principal ?? 0),
    termMonth: (p.months ?? 12) as 6 | 12 | 24 | 36,
    minRate: p.minRate ?? 0,
    intrRateType: toApiRateType(p.rateType),
    page: Math.max(0, page - 1),
    size,
    bankKeyword,
  };
};

export default function ProductComparePage() {
  const [kind, setKind] = useState<ProductType>("deposit");
  const [planValid, setPlanValid] = useState(false);

  const [, setPlanFilter] = useState<SavingsFilter | DepositFilter>({
    kind: "deposit",
  });
  const [plan, setPlan] = useState<SavingsFilter | DepositFilter>({
    kind: "deposit",
  });

  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selected, setSelected] = useState<Item[]>([]);
  const selectedIds = selected.map((x) => x.id);

  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [compareItems, setCompareItems] = useState<CompareResponseItem[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [openSections, setOpenSections] = useState<{ 2: boolean; 3: boolean }>({
    2: false,
    3: false,
  });

  const planRateType = (plan as SavingsFilter | DepositFilter).rateType;
  const normalizedRateType: "단리" | "복리" | undefined =
    planRateType === "단리" || planRateType === "복리"
      ? planRateType
      : undefined;

  const handleTabChange = (v: ProductType) => {
    setKind(v);
    setPlanValid(false);
    const init =
      v === "savings"
        ? { kind: "savings" as const }
        : { kind: "deposit" as const };
    setPlanFilter(init);
    setPlan(init);
    setSelected([]);
    setCompareItems([]);
    setVisibleItems([]);
    setPage(1);
    setTotalPages(1);
    setOpenSections({ 2: false, 3: false });
    setSelectedBank("");
  };

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

  const submitCompare = async () => {
    if (selected.length < 2) return;
    try {
      const body = buildCompareBody(kind, plan, selectedIds);
      const res = await compareProduct(body);
      setCompareItems(res.info);
      setWinnerId(res.winnerId);
      setOpenSections((s) => ({ ...s, 3: true }));
      document
        .getElementById("compare-anchor")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (e) {
      console.error("비교하기 실패:", e);
    }
  };

  useEffect(() => {
    if (selected.length < 2) {
      setCompareItems([]);
      setOpenSections((s) => ({ ...s, 3: false }));
    }
  }, [selected]);

  const handleApply = async () => {
    if (!planValid) return;
    try {
      const params = buildListQuery(kind, plan, 1);
      const {
        items,
        page: p,
        totalPages: tp,
      } = await getCompareProduct(params);

      const deduped = uniqBy(items, (x) => x.id);
      setVisibleItems(deduped);
      setPage(p);
      setTotalPages(tp);
      setOpenSections((s) => ({ ...s, 2: true }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBankApply = async () => {
    if (!planValid) return;
    try {
      const bankKw = selectedBank.trim() || undefined;
      const params = buildListQuery(kind, plan, 1, 20, bankKw);
      const {
        items,
        page: p,
        totalPages: tp,
      } = await getCompareProduct(params);

      const deduped = uniqBy(items, (x) => x.id);
      setVisibleItems(deduped);
      setPage(p);
      setTotalPages(tp);
      setOpenSections((s) => ({ ...s, 2: true }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (next: number) => {
    try {
      const bankKw = selectedBank.trim() || undefined;
      const params = buildListQuery(kind, plan, next, 20, bankKw);
      const {
        items,
        page: p,
        totalPages: tp,
      } = await getCompareProduct(params);

      const deduped = uniqBy(items, (x) => x.id);
      setVisibleItems(deduped);
      setPage(p);
      setTotalPages(tp);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePlanChange = useCallback(
    (f: SavingsFilter | DepositFilter, valid: boolean) => {
      setPlan(f);
      setPlanValid(valid);
    },
    [],
  );

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
        onApply={handleApply}
      >
        <PlanFilter kind={kind} onChange={handlePlanChange} />
      </CompareLayout>

      <CompareLayout
        no={2}
        sectionTitle="상품을 선택해주세요."
        open={openSections[2]}
      >
        <div className="lg:flex w-full">
          <ListSection
            items={visibleItems}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            currentPage={page}
            totalPage={totalPages}
            onChangePage={handleChangePage}
            selectedBank={selectedBank}
            onChangeBank={setSelectedBank}
            onSubmitSearch={handleBankApply}
          />
          <CardSection
            selected={selected}
            onRemove={removeSelected}
            onReset={resetSelected}
            onCompare={submitCompare}
          />
        </div>
      </CompareLayout>

      <div id="compare-anchor">
        <CompareLayout
          no={3}
          sectionTitle="선택한 상품을 비교해보세요!"
          open={openSections[3]}
        >
          <CompareSection
            items={compareItems}
            winnerId={winnerId}
            productType={kind}
            rateType={normalizedRateType}
            onReset={() => {
              setCompareItems([]);
              resetSelected();
            }}
          />
        </CompareLayout>
      </div>
    </div>
  );
}

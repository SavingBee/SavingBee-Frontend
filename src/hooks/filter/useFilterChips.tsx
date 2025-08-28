import { useMemo, Dispatch, SetStateAction } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OPTION_MAP } from "@/components/filter/dropdown/config";
import { LIST_KEY_MAP } from "@/utils/listKeyMap";
import type { ListCategory } from "@/types/uiFilter";

type RangeState = { min?: number; max?: number };
type Selected = Record<ListCategory, string[]>;
type UiChip = { key: string; label: string; onRemove: () => void };

/**
 *
 * 칩 생성
 * onRemove에서 상태 초기화 + URLSearchParams 동기화 처리
 * mode: 'savings' | 'deposit'
 */
export function useFilterChips(params: {
  mode: "savings" | "deposit";

  selected: Selected;
  setSelected: Dispatch<SetStateAction<Selected>>;

  amount?: number;
  setAmount: Dispatch<SetStateAction<number | undefined>>;

  monthlyAmount?: number;
  setMonthlyAmount: Dispatch<SetStateAction<number | undefined>>;

  baseRate: RangeState;
  setBaseRate: Dispatch<SetStateAction<RangeState>>;

  maxRate: RangeState;
  setMaxRate: Dispatch<SetStateAction<RangeState>>;

  totalAmount: RangeState; // saving: 총저축금, deposit: 가입한도(min/max)
  setTotalAmount: Dispatch<SetStateAction<RangeState>>;
}) {
  const {
    mode,
    selected,
    setSelected,
    amount,
    setAmount,
    monthlyAmount,
    setMonthlyAmount,
    baseRate,
    setBaseRate,
    maxRate,
    setMaxRate,
    totalAmount,
    setTotalAmount,
  } = params;

  const navigate = useNavigate();
  const [sp] = useSearchParams();

  // URL 교체 네비게이션 헬퍼
  const goReplace = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(sp);
    mutate(next);
    next.set("page", "1");
    navigate({ search: `?${next.toString()}` }, { replace: true });
  };

  const chips: UiChip[] = useMemo(() => {
    const acc: UiChip[] = [];

    // 리스트형 칩
    (Object.keys(selected) as ListCategory[]).forEach((cat) => {
      selected[cat].forEach((id) => {
        const label =
          (OPTION_MAP[cat] as Array<{ id: string; text: string }>)?.find(
            (o) => o.id === id,
          )?.text ?? id;

        acc.push({
          key: `list:${cat}:${id}`,
          label,
          onRemove: () => {
            // 상태 초기화
            setSelected((prev) => ({
              ...prev,
              [cat]: prev[cat].filter((v) => v !== id),
            }));
            // URL 동기화
            goReplace((next) => {
              const apiKey = LIST_KEY_MAP[cat];
              if (!apiKey) return;
              const cur = next.get(apiKey);
              if (!cur) return;

              // URL에는 id 또는 text가 들어가 있을 수 있으므로 둘 다 후보에서 제거
              const tokens = cur.split(",").filter(Boolean);
              const left = tokens.filter((t) => t !== id && t !== label);
              left.length
                ? next.set(apiKey, left.join(","))
                : next.delete(apiKey);
            });
          },
        });
      });
    });

    // 금액/범위형 칩
    if (typeof amount === "number") {
      acc.push({
        key: "amount",
        label: `저축금: ${amount.toLocaleString()}원`,
        onRemove: () => {
          setAmount(undefined);
          // amount는 URL에 쓰지 않는다면 URL 수정 불필요
        },
      });
    }

    if (baseRate.min !== undefined || baseRate.max !== undefined) {
      const a = baseRate.min ?? "최저값";
      const b = baseRate.max ?? "최고값";
      acc.push({
        key: "baseRate",
        label: `기본금리: ${a} ~ ${b}`,
        onRemove: () => {
          setBaseRate({});
          goReplace((next) => {
            next.delete("intrRateMin");
            next.delete("intrRateMax");
          });
        },
      });
    }

    if (maxRate.min !== undefined || maxRate.max !== undefined) {
      const a = maxRate.min ?? "최저값";
      const b = maxRate.max ?? "최고값";
      acc.push({
        key: "maxRate",
        label: `최고금리: ${a} ~ ${b}`,
        onRemove: () => {
          setMaxRate({});
          goReplace((next) => {
            next.delete("intrRate2Min");
            next.delete("intrRate2Max");
          });
        },
      });
    }

    // 저축, 예금 분리
    if (mode === "saving") {
      if (typeof monthlyAmount === "number") {
        acc.push({
          key: "monthlyAmount",
          label: `월저축금: ${monthlyAmount.toLocaleString()}원`,
          onRemove: () => {
            setMonthlyAmount(undefined);
            goReplace((next) => next.delete("monthlyMaxLimit"));
          },
        });
      }
      if (totalAmount.max !== undefined || totalAmount.min !== undefined) {
        const a =
          totalAmount.min !== undefined
            ? `${totalAmount.min.toLocaleString()}원`
            : "최저값";
        const b =
          totalAmount.max !== undefined
            ? `${totalAmount.max.toLocaleString()}원`
            : "최고값";
        acc.push({
          key: "totalAmount",
          label: `총저축금: ${a} ~ ${b}`,
          onRemove: () => {
            setTotalAmount({});
            goReplace((next) => next.delete("totalMaxLimit")); // saving: 최대만 사용
          },
        });
      }
    } else {
      // deposit: 가입한도 범위 칩
      if (totalAmount.min !== undefined || totalAmount.max !== undefined) {
        const a =
          totalAmount.min !== undefined
            ? `${totalAmount.min.toLocaleString()}원`
            : "최저값";
        const b =
          totalAmount.max !== undefined
            ? `${totalAmount.max.toLocaleString()}원`
            : "최고값";
        acc.push({
          key: "limitRange",
          label: `가입한도: ${a} ~ ${b}`,
          onRemove: () => {
            setTotalAmount({});
            goReplace((next) => {
              next.delete("maxLimitMin");
              next.delete("maxLimitMax");
            });
          },
        });
      }
    }

    return acc;
  }, [
    mode,
    selected,
    amount,
    monthlyAmount,
    baseRate,
    maxRate,
    totalAmount,
    sp, // URL 기준도 의존
  ]);

  return { chips };
}

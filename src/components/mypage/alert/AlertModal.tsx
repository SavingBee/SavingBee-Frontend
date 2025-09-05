import Button from "@/components/common/button/Button";
import Select from "@/components/common/button/Select";
import Checkbox from "@/components/common/input/Checkbox";
import InputField1 from "@/components/common/input/InputField1";
import Radiobox from "@/components/common/input/Radiobox";
import Modal from "@/components/common/modal/Modal";
import { useEffect, useMemo, useState } from "react";

import { getAlert, createAlert, patchAlert } from "@/api/alert";
import type { AlertSettingsBody, AlertSettingsResponse } from "@/types/alert";

type AlertType = "EMAIL" | "SMS" | "PUSH";
const ALLOWED_MONTHS = [6, 12, 24, 36] as const;
type TermMonth = (typeof ALLOWED_MONTHS)[number] | "";
type ProductKind = "deposit" | "savings";
type InterestKind = "S" | "M";

const MIN_RATE = 0;
const MAX_RATE = 10;
const MIN_AMOUNT = 10_000;
const MAX_AMOUNT = 1_000_000_000;

const onlyDigits = (s: string) => s.replace(/[^\d]/g, "");
const formatWithCommas = (s: string) => (s ? Number(s).toLocaleString() : "");

const normalizeRateInput = (s: string) => {
  let t = s.replace(/[^\d.]/g, "");
  const parts = t.split(".");
  if (parts.length > 2) t = parts[0] + "." + parts.slice(1).join("");
  const [intPart, decPart = ""] = t.split(".");
  const dec2 = decPart.slice(0, 2);
  return decPart !== undefined
    ? `${intPart}${dec2 ? "." + dec2 : ""}`
    : intPart;
};

const toNumber = (v: string | undefined) => {
  if (!v?.trim()) return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

const bodyFromState = (s: {
  alertType: AlertType;
  productKinds: ProductKind[];
  interestKinds: InterestKind[];
  rateNum: number;
  term: Exclude<TermMonth, "">;
  minAmountRaw: string;
  maxLimitRaw: string;
  validMinAmount: boolean;
  validMaxLimit: boolean;
}): AlertSettingsBody => ({
  alertType: s.alertType,
  productTypeDeposit: s.productKinds.includes("deposit"),
  productTypeSaving: s.productKinds.includes("savings"),
  minInterestRate: s.rateNum,
  interestCalcSimple: s.interestKinds.includes("S"),
  interestCalcCompound: s.interestKinds.includes("M"),
  maxSaveTerm: s.term,
  minAmount: s.validMinAmount && s.minAmountRaw ? Number(s.minAmountRaw) : null,
  maxLimit: s.validMaxLimit && s.maxLimitRaw ? Number(s.maxLimitRaw) : null,
});

function setChange<K extends keyof AlertSettingsBody>(
  target: Partial<AlertSettingsBody>,
  key: K,
  value: AlertSettingsBody[K],
) {
  target[key] = value;
}

const diffBody = (
  prev: AlertSettingsResponse | null,
  next: AlertSettingsBody,
): Partial<AlertSettingsBody> => {
  if (!prev) return next;

  const prevMapped: AlertSettingsBody = {
    alertType: prev.alertType,
    productTypeDeposit: !!prev.productTypeDeposit,
    productTypeSaving: !!prev.productTypeSaving,
    minInterestRate: prev.minInterestRate,
    interestCalcSimple: !!prev.interestCalcSimple,
    interestCalcCompound: !!prev.interestCalcCompound,
    maxSaveTerm: prev.maxSaveTerm,
    minAmount: prev.minAmount ?? null,
    maxLimit: prev.maxLimit ?? null,
  };

  const changes: Partial<AlertSettingsBody> = {};
  (Object.keys(next) as (keyof AlertSettingsBody)[]).forEach((k) => {
    const v = next[k];
    if (prevMapped[k] !== v) {
      setChange(changes, k, v);
    }
  });
  return changes;
};

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
  const [alertType, setAlertType] = useState<AlertType | "">("");
  const [rate, setRate] = useState<string>("");
  const [term, setTerm] = useState<TermMonth>("");

  const [productKinds, setProductKinds] = useState<ProductKind[]>([]);
  const [interestKinds, setInterestKinds] = useState<InterestKind[]>([]);
  const [minAmountRaw, setMinAmountRaw] = useState<string>("");
  const [maxLimitRaw, setMaxLimitRaw] = useState<string>("");

  const [initial, setInitial] = useState<AlertSettingsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const rateNum = useMemo(() => toNumber(rate), [rate]);
  const minAmountNum = useMemo(
    () => (minAmountRaw ? Number(minAmountRaw) : NaN),
    [minAmountRaw],
  );
  const maxLimitNum = useMemo(
    () => (maxLimitRaw ? Number(maxLimitRaw) : NaN),
    [maxLimitRaw],
  );

  const validAlertType =
    alertType === "EMAIL" || alertType === "SMS" || alertType === "PUSH";
  const validRate =
    Number.isFinite(rateNum) && rateNum > MIN_RATE && rateNum <= MAX_RATE;
  const validTerm = term !== "";

  const validMinAmount =
    !minAmountRaw ||
    (Number.isFinite(minAmountNum) &&
      minAmountNum >= MIN_AMOUNT &&
      minAmountNum <= MAX_AMOUNT);

  const validMaxLimit =
    !maxLimitRaw ||
    (Number.isFinite(maxLimitNum) &&
      maxLimitNum >= MIN_AMOUNT &&
      maxLimitNum <= MAX_AMOUNT &&
      (!minAmountRaw || maxLimitNum >= minAmountNum));

  const isValid = validAlertType && validRate && validTerm;

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getAlert();
        const isSaved = !!(data.createdAt || data.updatedAt);

        if (!mounted) return;

        if (isSaved) {
          setInitial(data);
          setAlertType((data.alertType as AlertType) ?? "EMAIL");
          setProductKinds([
            ...(data.productTypeDeposit ? (["deposit"] as const) : []),
            ...(data.productTypeSaving ? (["savings"] as const) : []),
          ]);
          setInterestKinds([
            ...(data.interestCalcSimple ? (["S"] as const) : []),
            ...(data.interestCalcCompound ? (["M"] as const) : []),
          ]);
          setRate(
            typeof data.minInterestRate === "number"
              ? String(data.minInterestRate)
              : "",
          );
          setTerm(
            [6, 12, 24, 36].includes(Number(data.maxSaveTerm))
              ? (Number(data.maxSaveTerm) as TermMonth)
              : "",
          );
          setMinAmountRaw(
            Number.isFinite(data.minAmount as number)
              ? String(Number(data.minAmount))
              : "",
          );
          setMaxLimitRaw(
            Number.isFinite(data.maxLimit as number)
              ? String(Number(data.maxLimit))
              : "",
          );
        } else {
          setInitial(null);
          setAlertType("EMAIL");
          setProductKinds([]);
          setInterestKinds([]);
          setRate("");
          setTerm("");
          setMinAmountRaw("");
          setMaxLimitRaw("");
        }
      } catch {
        setInitial(null);
        setAlertType("EMAIL");
        setProductKinds([]);
        setInterestKinds([]);
        setRate("");
        setTerm("");
        setMinAmountRaw("");
        setMaxLimitRaw("");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isOpen]);

  const handleProductKindToggle = (next: ProductKind) => {
    setProductKinds((prev) =>
      prev.includes(next) ? prev.filter((k) => k !== next) : [...prev, next],
    );
  };
  const handleInterestToggle = (next: InterestKind) => {
    setInterestKinds((prev) =>
      prev.includes(next) ? prev.filter((k) => k !== next) : [...prev, next],
    );
  };

  const handleSubmit = async () => {
    if (!isValid || submitting) return;

    const ui = {
      alertType,
      productKinds,
      interestKinds,
      rateNum: rateNum as number,
      term: term as Exclude<TermMonth, "">,
      minAmountRaw,
      maxLimitRaw,
      validMinAmount,
      validMaxLimit,
    };
    const body = bodyFromState(ui);

    try {
      setSubmitting(true);

      if (!initial) {
        await createAlert(body);
      } else {
        const delta = diffBody(initial, body);
        const requiredForPatch = {
          alertType: body.alertType,
          minInterestRate: body.minInterestRate,
          maxSaveTerm: body.maxSaveTerm,
        } as const;
        await patchAlert({ ...requiredForPatch, ...delta });
      }

      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalTitle="상품 알림 설정">
      <div className="mx-8">
        <div>
          <strong className="block font-bold text-sm text-black6 mb-1">
            알림방식
          </strong>
          <div className="flex gap-5 mt-2">
            {(["EMAIL", "SMS", "PUSH"] as const).map((v) => (
              <Radiobox
                key={v}
                id={`alert_${v.toLowerCase()}`}
                name="alert_type"
                value={v}
                label={v === "EMAIL" ? "이메일" : v.toLowerCase()}
                checked={alertType === v}
                onChange={(e) => setAlertType(e.target.value as AlertType)}
                labelClassName="font-medium text-sm"
              />
            ))}
          </div>
        </div>

        <div className="my-4">
          <strong className="block font-bold text-sm text-black6 mb-1 mt-4">
            상품 유형
          </strong>
          <div className="flex gap-5 mt-2">
            <Checkbox
              id="kind_deposit"
              name="product_kind_deposit"
              label="예금"
              labelClassName="text-sm"
              checked={productKinds.includes("deposit")}
              onChange={() => handleProductKindToggle("deposit")}
            />
            <Checkbox
              id="kind_savings"
              name="product_kind_savings"
              label="적금"
              labelClassName="text-sm"
              checked={productKinds.includes("savings")}
              onChange={() => handleProductKindToggle("savings")}
            />
          </div>
        </div>

        <div className="my-4">
          <InputField1
            type="text"
            label="연이율"
            value={rate}
            onChange={(e) => setRate(normalizeRateInput(e.target.value))}
            inputClassName="w-full"
            labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
            addonText="% 이상"
          />
          <p className="text-sm text-red mt-1 h-4">
            {rate
              ? validRate
                ? ""
                : `0보다 크고 ${MAX_RATE}% 이하로 입력하세요`
              : "필수 입력"}
          </p>
        </div>

        <div>
          <strong className="block font-bold text-sm text-black6 mb-1">
            이자 계산 방식
          </strong>
          <div className="flex gap-5 mt-2">
            <Checkbox
              id="interest_S"
              name="interest_simple"
              label="단리"
              labelClassName="text-sm"
              checked={interestKinds.includes("S")}
              onChange={() => handleInterestToggle("S")}
            />
            <Checkbox
              id="interest_M"
              name="interest_compound"
              label="복리"
              labelClassName="text-sm"
              checked={interestKinds.includes("M")}
              onChange={() => handleInterestToggle("M")}
            />
          </div>
        </div>

        <div className="mt-6">
          <Select
            label="예치 기간"
            id="depositPeriod"
            options={ALLOWED_MONTHS.map((m) => ({
              label: `${m}개월`,
              value: String(m),
            }))}
            placeholder="기간 선택"
            variant="lg"
            onChange={(v) => {
              setTerm(v === "" ? "" : (Number(v) as TermMonth));
            }}
            labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
            selectClassName="w-full"
            value={term === "" ? "" : String(term)}
          />
          <p className="text-sm text-red mt-1 h-4">
            {validTerm ? "" : "필수 입력"}
          </p>
        </div>

        <InputField1
          type="text"
          label="최소 가입 금액"
          inputClassName="w-full"
          labelClassName="block font-bold text-sm text-black6 mb-1 mt-4"
          addonText="원"
          value={formatWithCommas(minAmountRaw)}
          onChange={(e) => setMinAmountRaw(onlyDigits(e.target.value))}
        />
        <p className="text-sm text-red mt-1 h-4">
          {!minAmountRaw
            ? ""
            : validMinAmount
              ? ""
              : `${MIN_AMOUNT.toLocaleString()}원 이상 ${MAX_AMOUNT.toLocaleString()}원 이하로 입력하세요`}
        </p>

        <InputField1
          type="text"
          label="최대 한도"
          inputClassName="w-full"
          labelClassName="block font-bold text-sm text-black6 mb-1 mt-2"
          addonText="원"
          value={formatWithCommas(maxLimitRaw)}
          onChange={(e) => setMaxLimitRaw(onlyDigits(e.target.value))}
        />
        <p className="text-sm text-red mt-1 h-4">
          {!maxLimitRaw
            ? ""
            : maxLimitNum < MIN_AMOUNT || maxLimitNum > MAX_AMOUNT
              ? `${MIN_AMOUNT.toLocaleString()}원 이상 ${MAX_AMOUNT.toLocaleString()}원 이하로 입력하세요`
              : minAmountRaw && maxLimitNum < minAmountNum
                ? `최대 한도는 최소 가입 금액 이상이어야 합니다`
                : ""}
        </p>

        <div className="flex gap-4">
          <Button
            type="button"
            styleVariant="bg"
            variant="lg"
            className="rounded-md w-40 text-lg mt-4 bg-gray7"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="button"
            styleVariant="bg"
            variant="lg"
            disabled={!isValid || loading || submitting}
            className={`rounded-md w-40 text-lg mt-4 ${isValid && !loading && !submitting
                ? "bg-primary hover:bg-primary/90 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
              }`}
            onClick={handleSubmit}
          >
            {submitting ? "저장중..." : "저장"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;

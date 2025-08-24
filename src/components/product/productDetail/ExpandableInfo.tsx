import { useState } from "react";
import InfoRow from "./InfoRow";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

type Pair = { label: string; value?: string };

type Props = {
  title: string;
  pairs: Pair[];
  initialVisible?: number; // 5개
};

export default function ExpandableInfo({
  title,
  pairs,
  initialVisible = 5,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? pairs : pairs.slice(0, initialVisible);
  const hasMore = pairs.length > initialVisible;

  return (
    <section className="overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm">
      <div className="p-5">
        {/* 헤더 */}
        <div className="mb-3 pb-3 text-base font-semibold border-b border-base-200 ">
          {title}
        </div>
        <div className="h-px w-full bg-base-200" />

        {/* 내용 영역: 라인 구분 */}
        <div>
          {visible.map((p, i) => (
            <InfoRow key={i} label={p.label} value={p.value} />
          ))}
        </div>

        {/* 하단 더보기 바 */}
        {hasMore && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center justify-center gap-1 border-t border-base-200 py-4 text-sm text-base-content/80 hover:bg-base-100/60"
          >
            <span>{expanded ? "접기" : "더보기"}</span>
            {expanded ? <HiChevronUp size={16} /> : <HiChevronDown size={16} />}
          </button>
        )}
      </div>
    </section>
  );
}

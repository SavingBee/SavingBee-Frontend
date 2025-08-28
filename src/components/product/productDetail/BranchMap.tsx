import React from "react";
import MapOnly from "./MapOnly";
type Props = { title?: string };

export default function BranchMap({ title = "내 위치 기반 지도" }: Props) {
  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm">
      <div className="p-5">
        <div className="mb-3 text-base font-semibold">{title}</div>
        <div className="border-t border-b border-gray-300 bg-base-200/60">
          <MapOnly />
        </div>
      </div>
    </section>
  );
}

type InfoRowProps = { label: string; value?: string };
export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-start gap-4 py-3">
      <div className="text-sm text-base-content/60">{label}</div>
      <div className="text-sm leading-6">{value ?? "-"}</div>
    </div>
  );
}

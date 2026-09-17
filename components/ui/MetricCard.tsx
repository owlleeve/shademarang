export function MetricCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-[#ECE4E8] bg-white p-5"><p className="text-sm text-[#595155]">{label}</p><strong className="font-display text-3xl text-[#272023]">{value}</strong></div>;
}

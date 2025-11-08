export default function KPI({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm min-w-[160px]">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-sm text-gray-400">{sub}</div>}
    </div>
  );
}

export type TabKey = "routes" | "compare" | "banking" | "pooling";

export function Tabs({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  const items = [
    { key: "routes" as TabKey, label: "Routes" },
    { key: "compare" as TabKey, label: "Compare" },
    { key: "banking" as TabKey, label: "Banking" },
    { key: "pooling" as TabKey, label: "Pooling" }
  ];
  return (
    <nav className="bg-white p-3 rounded-md shadow-sm flex gap-2">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={`px-3 py-2 rounded ${active === it.key ? "bg-primary text-white" : "text-gray-700 hover:bg-surface"}`}
        >
          {it.label}
        </button>
      ))}
    </nav>
  );
}

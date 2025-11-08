import React, { useEffect, useState } from "react";
import { api } from "../../infrastructure/apiClient";
import Table from "../components/Table";

export default function PoolingTab() {
  const [year, setYear] = useState<number>(2025);
  const [members, setMembers] = useState<{ ship_id: string; cb_before_g: number }[]>([
    { ship_id: "R001", cb_before_g: 200000 },
    { ship_id: "R002", cb_before_g: 150000 },
    { ship_id: "R003", cb_before_g: -250000 }
  ]);
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleMemberShip(index: number, key: string, value: any) {
    setMembers((s) => s.map((m, i) => (i === index ? { ...m, [key]: value } : m)));
  }

  async function createPool() {
    // validations
    const sum = members.reduce((a, b) => a + (b.cb_before_g ?? 0), 0);
    if (sum < 0) return alert("Sum(adjustedCB) must be >= 0");
    try {
      setLoading(true);
      const res: any = await api.createPool(year, members);
      setResult(res.members ?? []);
      alert("Pool created");
    } catch (err: any) {
      alert(err.message || "Failed to create pool");
    } finally {
      setLoading(false);
    }
  }

  const headers = ["ship_id", "cb_before_g", "cb_after_g"];
  const rows = result.length ? result.map((r: any) => (
    <tr key={r.ship_id} className="border-b hover:bg-surface">
      <td className="p-2">{r.ship_id}</td>
      <td className="p-2">{r.cb_before}</td>
      <td className="p-2">{r.cb_after}</td>
    </tr>
  )) : [<tr key="none"><td colSpan={3} className="p-4 text-sm text-gray-500">No pool created yet.</td></tr>];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border p-2 rounded w-32" />
        <button className="bg-primary text-white px-3 py-2 rounded" onClick={createPool}>Create Pool</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {members.map((m, idx) => (
          <div key={m.ship_id} className="bg-white p-3 rounded shadow-sm">
            <div className="text-sm text-gray-500">Ship</div>
            <div className="font-semibold">{m.ship_id}</div>
            <div className="mt-2">
              <input type="number" value={m.cb_before_g} onChange={e => toggleMemberShip(idx, "cb_before_g", Number(e.target.value))} className="border p-2 rounded w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded p-4 shadow-sm">
        <Table headers={headers} rows={rows} />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { api } from "../../infrastructure/apiClient";
import { gToTonne, formatNumber } from "../../../shared/utils";
import Table from "../components/Table";

export default function BankingTab() {
  const [shipId, setShipId] = useState("R004");
  const [year, setYear] = useState<number>(2025);
  const [records, setRecords] = useState<any[]>([]);
  const [totalG, setTotalG] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function fetchRecords() {
    try {
      setLoading(true);
      const res: any = await api.getBankRecords(shipId, year);
      setRecords(res.entries ?? []);
      setTotalG(res.total_g ?? 0);
    } catch (err: any) {
      alert(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  async function bank() {
    try {
      await api.bank(shipId, year, amount);
      await fetchRecords();
      alert("Banked!");
    } catch (err: any) {
      alert(err.message || "Failed to bank");
    }
  }

  async function apply() {
    if (amount > totalG) return alert("Cannot apply more than available");
    try {
      await api.applyBanked(shipId, year, amount);
      await fetchRecords();
      alert("Applied!");
    } catch (err: any) {
      alert(err.message || "Failed to apply");
    }
  }

  const headers = ["id", "ship", "year", "amount_g"];
  const rows = records.map((r) => (
    <tr key={r.id} className="border-b hover:bg-surface">
      <td className="p-2">{r.id}</td>
      <td className="p-2">{r.ship_id}</td>
      <td className="p-2">{r.year}</td>
      <td className="p-2">{r.amount_gco2eq}</td>
    </tr>
  ));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input value={shipId} onChange={e => setShipId(e.target.value)} className="border p-2 rounded" />
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border p-2 rounded w-32" />
        <button className="bg-primary text-white px-3 py-2 rounded" onClick={fetchRecords}>Fetch</button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-xs text-gray-500">CB (g)</div>
          <div className="text-xl font-semibold">{totalG}</div>
          <div className="text-xs text-gray-400">{formatNumber(gToTonne(totalG))} tCO₂e</div>
        </div>

        <div className="flex gap-2">
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="border p-2 rounded w-40" placeholder="amount (g)" />
          <button onClick={bank} className={`px-3 py-2 rounded text-white ${amount <= 0 ? "bg-gray-400" : "bg-green-600"}`}>Bank</button>
          <button onClick={apply} className={`px-3 py-2 rounded text-white ${amount <= 0 || amount > totalG ? "bg-gray-400" : "bg-blue-600"}`}>Apply</button>
        </div>
      </div>

      <Table headers={headers} rows={rows} />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { api } from "../../infrastructure/apiClient";
import { buildComparisonTable } from "../../../core/application/usecases";
import { TARGET_INTENSITY_2025 } from "../../../core/domain/constants";
import Table from "../components/Table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function CompareTab() {
  const [baseline, setBaseline] = useState<any | null>(null);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchComparison() {
    setLoading(true);
    try {
      const result: any = await api.getComparison();
      if (!result) return;
      setBaseline(result.baseline);
      setComparisons(result.comparisons);
    } catch (err: any) {
      alert(err.message || "Failed to fetch comparison");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComparison();
  }, []);

  const headers = ["routeId", "baseline (gCO₂e/MJ)", "comparison (gCO₂e/MJ)", "% diff", "compliant"];
  const rows = (comparisons || []).map((c: any) => (
    <tr key={c.routeId} className="border-b hover:bg-surface">
      <td className="p-2">{c.routeId}</td>
      <td className="p-2">{c.ghgIntensityBaseline}</td>
      <td className="p-2">{c.ghgIntensityComparison}</td>
      <td className="p-2">{c.percentDiff.toFixed(2)}%</td>
      <td className="p-2">{c.compliant ? "✅" : "❌"}</td>
    </tr>
  ));

  const chartData = (comparisons || []).map((c: any) => ({
    name: c.routeId,
    baseline: c.ghgIntensityBaseline,
    comparison: c.ghgIntensityComparison
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-sm text-gray-500">Target (2025)</div>
          <div className="text-lg font-semibold">{TARGET_INTENSITY_2025} gCO₂e/MJ</div>
        </div>
        <div className="text-sm text-gray-600">{baseline ? `Baseline route: ${baseline.route_id} (${baseline.ghg_intensity} gCO₂e/MJ)` : "No baseline set"}</div>
      </div>

      {loading ? <div>Loading...</div> : (
        <>
          <div style={{ height: 300 }} className="bg-white rounded p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="baseline" name="Baseline" />
                <Bar dataKey="comparison" name="Comparison" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Table headers={headers} rows={rows} />
        </>
      )}
    </div>
  );
}

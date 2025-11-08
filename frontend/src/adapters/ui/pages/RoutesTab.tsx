import { useEffect, useState } from "react";
import { api } from "../../infrastructure/apiClient";
import { type RouteRow } from "../../../core/domain/types";
import Table from "../components/Table";

export default function RoutesTab() {
  const [routes, setRoutes] = useState<RouteRow[]>([]);
  const [filters, setFilters] = useState({ vesselType: "", fuelType: "", year: "" });
  const [loading, setLoading] = useState(false);

  async function fetchRoutes() {
    setLoading(true);
    try {
      const params: any = {};
      if (filters.vesselType) params.vesselType = filters.vesselType;
      if (filters.fuelType) params.fuelType = filters.fuelType;
      if (filters.year) params.year = filters.year;
      const data = await api.getRoutes(params);
      setRoutes(data ?? []);
    } catch (err: any) {
      alert(err.message || "Failed to load routes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoutes();
  }, []);

  async function setBaseline(id: number) {
    if (!confirm("Set this route as baseline?")) return;
    try {
      await api.setBaseline(id);
      fetchRoutes();
    } catch (err: any) {
      alert(err.message || "Failed to set baseline");
    }
  }

  const headers = ["routeId", "vesselType", "fuelType", "year", "ghgIntensity", "fuelConsumption(t)", "distance(km)", "totalEmissions(t)", "actions"];
  const rows = routes.map((r) => (
    <tr key={r.id} className="border-b hover:bg-surface">
      <td className="p-2">{r.route_id}{r.is_baseline ? " ⭐" : ""}</td>
      <td className="p-2">{r.vessel_type}</td>
      <td className="p-2">{r.fuel_type}</td>
      <td className="p-2">{r.year}</td>
      <td className="p-2">{r.ghg_intensity}</td>
      <td className="p-2">{r.fuel_consumption_t}</td>
      <td className="p-2">{r.distance_km}</td>
      <td className="p-2">{r.total_emissions_t}</td>
      <td className="p-2">
        <button onClick={() => setBaseline(r.id)} className="bg-green-600 text-white px-2 py-1 rounded">Set Baseline</button>
      </td>
    </tr>
  ));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input placeholder="Vessel Type" value={filters.vesselType} onChange={e => setFilters(s => ({ ...s, vesselType: e.target.value }))} className="border p-2 rounded" />
        <input placeholder="Fuel Type" value={filters.fuelType} onChange={e => setFilters(s => ({ ...s, fuelType: e.target.value }))} className="border p-2 rounded" />
        <input placeholder="Year" value={filters.year} onChange={e => setFilters(s => ({ ...s, year: e.target.value }))} className="border p-2 rounded w-24" />
        <button onClick={fetchRoutes} className="bg-primary text-white px-3 py-2 rounded">Apply</button>
      </div>

      {loading ? <div>Loading...</div> : <Table headers={headers} rows={rows} />}
    </div>
  );
}

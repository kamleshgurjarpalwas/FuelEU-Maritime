// single place to change base URL
const BASE = import.meta.env.VITE_API_BASE;

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers ?? {}) },
  });
  if (!res.ok) {
    const text = await res.text();
    // try to parse JSON error
    try {
      const json = JSON.parse(text);
      throw new Error(json.error ?? JSON.stringify(json));
    } catch {
      throw new Error(text || `Request failed ${res.status}`);
    }
  }
  // some endpoints may return empty body
  const t = await res.text();
  if (!t) return null;
  return JSON.parse(t);
}

export const api = {
  // routes
  getRoutes: (filters?: any) =>
    request(
      `/routes${filters ? "?" + new URLSearchParams(filters).toString() : ""}`
    ),
  setBaseline: (id: number) =>
    request(`/routes/${id}/baseline`, { method: "POST" }),

  // comparison
  getComparison: () => request(`/routes/comparison`),

  // compliance / banking
  computeCB: (routeId: string) =>
    request(`/compliance/cb?routeId=${encodeURIComponent(routeId)}`),
  getAdjustedCB: (shipId: string, year: number) =>
    request(
      `/compliance/adjusted-cb?shipId=${encodeURIComponent(shipId)}&year=${year}`
    ),

  // banking
  getBankRecords: (shipId: string, year: number) =>
    request(
      `/banking/records?shipId=${encodeURIComponent(shipId)}&year=${year}`
    ),
  bank: (shipId: string, year: number, amount_g: number) =>
    request(`/banking/bank`, {
      method: "POST",
      body: JSON.stringify({ shipId, year, amount_g }),
    }),
  applyBanked: (shipId: string, year: number, amount_g: number) =>
    request(`/banking/apply`, {
      method: "POST",
      body: JSON.stringify({ shipId, year, amount_g }),
    }),

  // pools
  getAdjustedCBAll: (year: number) =>
    request(`/compliance/adjusted-cb?year=${year}`), // optional, adjust based on backend signature
  createPool: (year: number, members: any[]) =>
    request(`/pools`, {
      method: "POST",
      body: JSON.stringify({ year, members }),
    }),
};

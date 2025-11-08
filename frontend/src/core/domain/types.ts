// Route Types
export type RouteRow = {
  id: number;
  route_id: string;
  vessel_type: string;
  fuel_type: string;
  year: number;
  ghg_intensity: number;
  fuel_consumption_t: number;
  distance_km: number;
  total_emissions_t: number;
  is_baseline?: boolean;
};

export type RouteFilters = {
  vesselType?: string;
  fuelType?: string;
  year?: number;
};

// Comparison Types
export type ComparisonRow = {
  routeId: string;
  ghgIntensityBaseline: number;
  ghgIntensityComparison: number;
  percentDiff: number;
  compliant: boolean;
};

// Banking Types
export type BankEntry = {
  id?: number;
  ship_id: string;
  year: number;
  amount_gco2eq: number;
  created_at?: string;
};

export type BankingAction = {
  shipId: string;
  year: number;
  amount_g: number;
};

// Compliance Types
export type ComplianceInfo = {
  cbValue: number;
  adjustedCb?: number;
};

// Pool Types
export type PoolMember = {
  ship_id: string;
  cb_before_g: number;
  cb_after_g?: number;
};

export type Pool = {
  year: number;
  members: PoolMember[];
};

// UI Types
export type TabId = 'routes' | 'comparison' | 'banking' | 'pools';

export type KPIData = {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
};

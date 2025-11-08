import {type RouteRow,type ComparisonRow } from "../domain/types";

export interface RoutePort {
  getRoutes(filters?: { vesselType?: string; fuelType?: string; year?: number }): Promise<RouteRow[]>;
  setBaseline(routeId: number): Promise<void>;
  getComparison(): Promise<{ baseline: RouteRow; comparisons: ComparisonRow[] }>;
}

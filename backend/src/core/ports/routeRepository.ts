import { Route } from '@prisma/client';

export interface RouteRepository {
  findAll(filters?: { vesselType?: string; fuelType?: string; year?: number }): Promise<Route[]>;
  findById(id: number): Promise<Route | null>;
  findBaselineByYear(year?: number): Promise<Route | null>;
  setBaseline(id: number): Promise<void>;
  findByYear(year: number): Promise<Route[]>;
}

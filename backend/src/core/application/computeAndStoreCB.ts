import { computeCB } from './computeCB';
import { ComplianceRepository } from '../ports/complianceRepository';
import { RouteRepository } from '../ports/routeRepository';
import { AppError } from '../../shared/errors';

export const computeAndStoreCB = (routeRepo: RouteRepository, complianceRepo: ComplianceRepository) => async (routeId: number) => {
  const route = await routeRepo.findById(routeId);
  if (!route) throw new AppError('Route not found', 404);

  const { cb_gco2 } = computeCB(route.ghg_intensity, route.fuel_consumption_t);
  // store snapshot; use ship_id = route.route_id for simplicity
  await complianceRepo.createSnapshot(route.route_id, route.year, cb_gco2);
  return { routeId: route.route_id, cb_gco2 };
};

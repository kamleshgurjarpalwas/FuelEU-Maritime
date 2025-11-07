import { RouteRepository } from '../ports/routeRepository';

export const getRoutes = (routeRepo: RouteRepository) => async (filters?: any) => {
  return routeRepo.findAll(filters);
};

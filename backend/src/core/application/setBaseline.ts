import { RouteRepository } from '../ports/routeRepository';

export const setBaseline = (routeRepo: RouteRepository) => async (id: number) => {
  return routeRepo.setBaseline(id);
};

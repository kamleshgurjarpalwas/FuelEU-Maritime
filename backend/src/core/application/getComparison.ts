import { RouteRepository } from '../ports/routeRepository';

export const getComparison = (routeRepo: RouteRepository, target = 89.3368) => async () => {
  const baseline = await routeRepo.findBaselineByYear();
  if (!baseline) throw new Error('No baseline set');
  const others = await routeRepo.findByYear(baseline.year);
  const comparisons = others.map(o => {
    const percentDiff = ((o.ghg_intensity / baseline.ghg_intensity) - 1) * 100;
    const compliant = o.ghg_intensity <= target;
    return {
      routeId: o.route_id,
      ghgIntensityBaseline: baseline.ghg_intensity,
      ghgIntensityComparison: o.ghg_intensity,
      percentDiff,
      compliant
    };
  });
  return { baseline, comparisons };
};

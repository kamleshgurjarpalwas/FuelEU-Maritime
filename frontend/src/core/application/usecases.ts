import { type ComparisonRow } from "../domain/types";
import { TARGET_INTENSITY_2025 } from "../domain/constants";

export function percentDiff(comparison: number, baseline: number) {
  if (baseline === 0) return 0;
  return ((comparison / baseline) - 1) * 100;
}

export function compliant(ghg: number, target = TARGET_INTENSITY_2025) {
  return ghg <= target;
}

export function buildComparisonTable(baselineGhg: number, comparisons: { routeId: string; ghgIntensity: number }[]): ComparisonRow[] {
  return comparisons.map((c) => {
    const pd = percentDiff(c.ghgIntensity, baselineGhg);
    return {
      routeId: c.routeId,
      ghgIntensityBaseline: baselineGhg,
      ghgIntensityComparison: c.ghgIntensity,
      percentDiff: pd,
      compliant: compliant(c.ghgIntensity)
    };
  });
}

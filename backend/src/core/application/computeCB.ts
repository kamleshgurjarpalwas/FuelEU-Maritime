import { TARGET_INTENSITY_2025, MJ_PER_TONNE_FUEL } from '../domain/constants';

// returns { cb_gco2: grams, cb_tco2: tonnes }
export function computeCB(actualGhgIntensity: number, fuelTonnes: number, target = TARGET_INTENSITY_2025) {
  const energyMJ = fuelTonnes * MJ_PER_TONNE_FUEL; // MJ
  const cb_gco2 = (target - actualGhgIntensity) * energyMJ; // gCO2e
  const cb_tco2 = cb_gco2 / 1_000_000; // tonnes CO2e
  return { cb_gco2, cb_tco2 };
}

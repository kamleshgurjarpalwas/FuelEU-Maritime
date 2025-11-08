export const gToTonne = (g: number) => g / 1_000_000;
export const formatNumber = (n: number, digits = 2) => Number.isFinite(n) ? n.toFixed(digits) : "-";

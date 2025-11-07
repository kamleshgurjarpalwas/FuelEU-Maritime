import { ComplianceRepository } from '../ports/complianceRepository';
import { BankingRepository } from '../ports/bankingRepository';

export const getAdjustedCB = (complianceRepo: ComplianceRepository, bankingRepo: BankingRepository) => async (shipId: string, year: number) => {
  const snap = await complianceRepo.getLatestSnapshot(shipId, year);
  const base = snap ? snap.cb_gco2eq : 0;
  const banked = await bankingRepo.getBankedTotal(shipId, year);
  // banked amount (sum) is in grams; applied entries negative subtract
  const adjusted = base + banked; // both grams
  return { shipId, year, cb_before_g: base, banked_g: banked, cb_after_g: adjusted };
};

import { BankingRepository } from '../ports/bankingRepository';
import { AppError } from '../../shared/errors';

export const applyBanked = (bankRepo: BankingRepository) => async (shipId: string, year: number, amount_gco2eq: number) => {
  if (amount_gco2eq <= 0) throw new AppError('Apply amount must be positive', 400);
  const available = await bankRepo.getBankedTotal(shipId, year);
  if (amount_gco2eq > available) throw new AppError('Cannot apply more than available banked', 400);
  // record negative entry to represent application
  await bankRepo.createBankEntry(shipId, year, -Math.abs(amount_gco2eq));
  return { shipId, year, applied_g: amount_gco2eq, remaining_g: available - amount_gco2eq };
};

import { BankingRepository } from '../ports/bankingRepository';
import { AppError } from '../../shared/errors';

export const bankSurplus = (bankRepo: BankingRepository) => async (shipId: string, year: number, amount_gco2eq: number) => {
  if (amount_gco2eq <= 0) throw new AppError('No positive CB to bank', 400);
  await bankRepo.createBankEntry(shipId, year, amount_gco2eq);
  return { shipId, year, banked_g: amount_gco2eq };
};

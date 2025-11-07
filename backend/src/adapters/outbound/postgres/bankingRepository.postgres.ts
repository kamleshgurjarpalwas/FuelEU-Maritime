import prisma from '../../../infrastructure/db/prismaClient';
import { BankingRepository } from '../../../core/ports/bankingRepository';

export const BankingRepositoryPostgres: BankingRepository = {
  async createBankEntry(shipId, year, amount_gco2eq) {
    await prisma.bankEntry.create({ data: { ship_id: shipId, year, amount_gco2eq } });
  },

  async getBankedTotal(shipId, year) {
    const res = await prisma.bankEntry.aggregate({
      where: { ship_id: shipId, year },
      _sum: { amount_gco2eq: true }
    });
    return res._sum.amount_gco2eq ?? 0;
  },

  async listBankEntries(shipId, year) {
    return prisma.bankEntry.findMany({ where: { ship_id: shipId, year }, orderBy: { created_at: 'desc' } });
  }
};

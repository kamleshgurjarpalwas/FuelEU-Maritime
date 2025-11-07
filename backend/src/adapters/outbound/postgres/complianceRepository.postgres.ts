import prisma from '../../../infrastructure/db/prismaClient';
import { ComplianceRepository } from '../../../core/ports/complianceRepository';

export const ComplianceRepositoryPostgres: ComplianceRepository = {
  async createSnapshot(shipId, year, cb_gco2eq) {
    await prisma.shipCompliance.create({ data: { ship_id: shipId, year, cb_gco2eq } });
  },

  async getLatestSnapshot(shipId, year) {
    const rec = await prisma.shipCompliance.findFirst({ where: { ship_id: shipId, year }, orderBy: { created_at: 'desc' }});
    if (!rec) return null;
    return { cb_gco2eq: rec.cb_gco2eq };
  }
};

import prisma from '../../../infrastructure/db/prismaClient';
import { PoolRepository } from '../../../core/ports/poolRepository';

export const PoolRepositoryPostgres: PoolRepository = {
  async createPool(year) {
    const p = await prisma.pool.create({ data: { year }});
    return { id: p.id };
  },

  async addMembers(poolId, members) {
    const data = members.map(m => ({ pool_id: poolId, ship_id: m.ship_id, cb_before: m.cb_before, cb_after: m.cb_after }));
    await prisma.poolMember.createMany({ data });
  }
};

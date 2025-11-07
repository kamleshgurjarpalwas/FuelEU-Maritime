import prisma from '../../../infrastructure/db/prismaClient';
import { RouteRepository } from '../../../core/ports/routeRepository';

export const RouteRepositoryPostgres: RouteRepository = {
  async findAll(filters) {
    const where: any = {};
    if (filters?.vesselType) where.vessel_type = filters.vesselType;
    if (filters?.fuelType) where.fuel_type = filters.fuelType;
    if (filters?.year) where.year = filters.year;
    return prisma.route.findMany({ where, orderBy: { id: 'asc' } });
  },

  async findById(id) {
    return prisma.route.findUnique({ where: { id } });
  },

  async findBaselineByYear(year) {
    if (year) return prisma.route.findFirst({ where: { year, is_baseline: true } });
    return prisma.route.findFirst({ where: { is_baseline: true } });
  },

  async setBaseline(id: number) {
    // unset previous baseline for same year, then set this
    const r = await prisma.route.findUnique({ where: { id } });
    if (!r) throw new Error('Route not found');
    await prisma.route.updateMany({ where: { year: r.year }, data: { is_baseline: false } });
    await prisma.route.update({ where: { id }, data: { is_baseline: true } });
  },

  async findByYear(year) {
    return prisma.route.findMany({ where: { year } });
  }
};

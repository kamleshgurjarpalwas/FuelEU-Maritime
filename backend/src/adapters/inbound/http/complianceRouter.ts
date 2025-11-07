import express from 'express';
import { RouteRepositoryPostgres } from '../../outbound/postgres/routeRepository.postgres';
import { ComplianceRepositoryPostgres } from '../../outbound/postgres/complianceRepository.postgres';
import { getAdjustedCB } from '../../../core/application/getAdjustedCB';
import { computeAndStoreCB } from '../../../core/application/computeAndStoreCB';
import { BankingRepositoryPostgres } from '../../outbound/postgres/bankingRepository.postgres';

const router = express.Router();
const computeCBHandler = computeAndStoreCB(RouteRepositoryPostgres, ComplianceRepositoryPostgres);
const getAdjustedCBHandler = getAdjustedCB(ComplianceRepositoryPostgres, BankingRepositoryPostgres);

router.get('/compliance/cb', async (req, res) => {
  try {
    const routeIdParam = req.query.routeId as string;
    if (!routeIdParam) return res.status(400).json({ error: 'routeId required' });
    const routeId = String(routeIdParam);
    // console.log(typeof routeId);
    const result = await computeCBHandler(routeId);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/compliance/adjusted-cb', async (req, res) => {
  try {
    const shipId = req.query.shipId as string;
    const year = Number(req.query.year);
    if (!shipId || !year) return res.status(400).json({ error: 'shipId and year required' });
    const result = await getAdjustedCBHandler(shipId, year);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

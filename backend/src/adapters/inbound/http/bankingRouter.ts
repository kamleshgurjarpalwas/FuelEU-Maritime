import express from 'express';
import { BankingRepositoryPostgres } from '../../outbound/postgres/bankingRepository.postgres';
import { bankSurplus } from '../../../core/application/bankSurplus';
import { applyBanked } from '../../../core/application/applyBanked';

const router = express.Router();
const bankSurplusHandler = bankSurplus(BankingRepositoryPostgres);
const applyBankedHandler = applyBanked(BankingRepositoryPostgres);

router.get('/banking/records', async (req, res) => {
  const shipId = req.query.shipId as string;
  const year = Number(req.query.year);
  if (!shipId || !year) return res.status(400).json({ error: 'shipId & year required' });

  try {
    const entries = await BankingRepositoryPostgres.listBankEntries(shipId, year);
    const total = await BankingRepositoryPostgres.getBankedTotal(shipId, year);
    res.json({ entries, total_g: total });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/banking/bank', async (req, res) => {
  const { shipId, year, amount_g } = req.body;
  try {
    const result = await bankSurplusHandler(shipId, year, amount_g);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/banking/apply', async (req, res) => {
  const { shipId, year, amount_g } = req.body;
  try {
    const result = await applyBankedHandler(shipId, year, amount_g);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

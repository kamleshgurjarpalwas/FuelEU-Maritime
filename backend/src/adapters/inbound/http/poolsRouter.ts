import express from 'express';
import { PoolRepositoryPostgres } from '../../outbound/postgres/poolRepository.postgres';
import { createPool } from '../../../core/application/createPool';

const router = express.Router();
const createPoolHandler = createPool(PoolRepositoryPostgres);

router.post('/pools', async (req, res) => {
  try {
    const { year, members } = req.body; // members: [{ship_id, cb_before_g}]
    if (!year || !Array.isArray(members)) return res.status(400).json({ error: 'year and members required' });
    const result = await createPoolHandler(year, members);
    res.json({ ok: true, members: result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

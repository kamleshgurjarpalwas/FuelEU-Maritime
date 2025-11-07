import { PoolRepository } from '../ports/poolRepository';
import { AppError } from '../../shared/errors';

/**
 * members: Array<{ ship_id: string, cb_before_g: number }>
 * cb_before_g: grams (positive = surplus, negative = deficit)
 *
 * Returns members with cb_after_g
 */
export const createPool = (poolRepo: PoolRepository) => async (year: number, members: { ship_id: string, cb_before_g: number }[]) => {
  const total = members.reduce((s, m) => s + m.cb_before_g, 0);
  if (total < -1e-6) throw new AppError('Sum(cb_before) must be >= 0', 400);

  // clone arrays
  const surpluses = members.filter(m => m.cb_before_g > 0).map(m => ({ ...m }));
  const deficits = members.filter(m => m.cb_before_g < 0).map(m => ({ ...m }));

  // sort surpluses descending, deficits ascending (most negative first)
  surpluses.sort((a, b) => b.cb_before_g - a.cb_before_g);
  deficits.sort((a, b) => a.cb_before_g - b.cb_before_g);

  const afterMap: Record<string, number> = {};
  members.forEach(m => afterMap[m.ship_id] = m.cb_before_g);

  let sIdx = 0;
  for (const d of deficits) {
    let need = Math.abs(d.cb_before_g);
    while (need > 1e-6 && sIdx < surpluses.length) {
      const s = surpluses[sIdx];
      const available = afterMap[s.ship_id]; // current surplus grams
      const give = Math.min(available, need);
      // allocate
      afterMap[s.ship_id] = +(afterMap[s.ship_id] - give);
      afterMap[d.ship_id] = +(afterMap[d.ship_id] + give);
      need -= give;
      if (afterMap[s.ship_id] <= 1e-6) sIdx++;
    }
    if (need > 1e-3) throw new AppError('Insufficient surplus to cover deficits', 500);
  }

  // persist pool and members
  const pool = await poolRepo.createPool(year);
  const membersToPersist = members.map(m => ({ ship_id: m.ship_id, cb_before: m.cb_before_g, cb_after: afterMap[m.ship_id] }));
  await poolRepo.addMembers(pool.id, membersToPersist);

  return membersToPersist.map(m => ({ ship_id: m.ship_id, cb_before_g: m.cb_before, cb_after_g: m.cb_after }));
};

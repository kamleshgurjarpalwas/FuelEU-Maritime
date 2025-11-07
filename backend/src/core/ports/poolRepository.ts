export interface PoolRepository {
  createPool(year: number): Promise<{ id: number }>;
  addMembers(poolId: number, members: { ship_id: string, cb_before: number, cb_after: number }[]): Promise<void>;
}

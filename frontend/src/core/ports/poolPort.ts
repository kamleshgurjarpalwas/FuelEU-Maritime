import {type PoolMember } from "../domain/types";

export interface PoolPort {
  createPool(year: number, members: PoolMember[]): Promise<{ ok: true; members: PoolMember[] }>;
  getAdjustedCB(year: number): Promise<{ ship_id: string; cb_before_g: number; cb_after_g: number }[]>;
}

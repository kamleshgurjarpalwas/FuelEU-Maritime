import {type BankEntry } from "../domain/types";

export interface BankingPort {
  getBankRecords(shipId: string, year: number): Promise<{ entries: BankEntry[]; total_g: number }>;
  bank(shipId: string, year: number, amount_g: number): Promise<any>;
  apply(shipId: string, year: number, amount_g: number): Promise<any>;
  getAdjustedCB(shipId: string, year: number): Promise<{ shipId: string; year: number; cb_before_g: number; banked_g: number; cb_after_g: number }>;
}

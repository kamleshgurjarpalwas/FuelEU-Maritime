export interface BankingRepository {
  createBankEntry(shipId: string, year: number, amount_gco2eq: number): Promise<void>;
  getBankedTotal(shipId: string, year: number): Promise<number>; // grams
  listBankEntries(shipId: string, year: number): Promise<Array<{id:number, amount_gco2eq:number, created_at:Date}>>;
}

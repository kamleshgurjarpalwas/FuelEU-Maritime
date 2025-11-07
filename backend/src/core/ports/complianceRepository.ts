export interface ComplianceRepository {
  createSnapshot(shipId: string, year: number, cb_gco2eq: number): Promise<void>;
  getLatestSnapshot(shipId: string, year: number): Promise<{ cb_gco2eq: number } | null>;
}

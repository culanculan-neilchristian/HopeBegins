import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface ImpactData {
  subscribers: number;
  listeners: number;
  journeys: number;
  carriers: number;
  lives_touched: number;
}

export const analyticsService = {
  getImpactData: async (): Promise<ImpactData> => {
    return fetchWithAuth(`${config.API_URL}/analytics/impact/`);
  },
};

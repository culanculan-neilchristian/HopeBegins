import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface HopeJourneySubscription {
  first_name: string;
  last_name: string;
  email: string;
}

export const dailyHopeService = {
  subscribe: async (data: HopeJourneySubscription): Promise<any> => {
    return fetchWithAuth(`${config.API_URL}/daily-hope/journeys/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  completeHopefulBeginning: async (): Promise<any> => {
    return fetchWithAuth(
      `${config.API_URL}/daily-hope/hopeful-beginning-complete/`,
      {
        method: 'POST',
      }
    );
  },
};

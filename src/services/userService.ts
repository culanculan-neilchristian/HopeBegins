import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface DonationPayload {
  name?: string;
  email?: string;
  amount: number;
  donation_type: 'ONE_TIME' | 'MONTHLY';
  message?: string;
}

export const userService = {
  applyAsCarrier: async (data: any) => {
    const payload = { ...data, username: data.username || data.email };
    return fetchWithAuth(`${config.API_URL}/users/register/carrier/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  submitDonation: async (data: DonationPayload) => {
    return fetchWithAuth(`${config.API_URL}/donations/give/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

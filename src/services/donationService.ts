import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface DonationRequest {
  amount: number;
  donation_type: 'ONE_TIME' | 'MONTHLY';
  covers_fee: boolean;
  name: string;
  email: string;
}

const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem('adminToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const donationService = {
  createCheckoutSession: async (
    data: DonationRequest
  ): Promise<{ checkout_url: string }> => {
    return fetchWithAuth(`${config.API_URL}/donations/checkout/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin methods
  getDonations: async (params?: any): Promise<any> => {
    const urlParams = new URLSearchParams(params).toString();
    return fetchWithAuth(
      `${config.API_URL}/donations/${urlParams ? `?${urlParams}` : ''}`,
      {
        headers: authHeader(),
      }
    );
  },

  getOverview: async (): Promise<any> => {
    return fetchWithAuth(`${config.API_URL}/donations/overview/`, {
      headers: authHeader(),
    });
  },
};

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

  forgotPassword: async (email: string) => {
    return fetchWithAuth(`${config.API_URL}/users/forgot-password/`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (data: any) => {
    return fetchWithAuth(`${config.API_URL}/users/reset-password/`, {
      method: 'POST',
      body: JSON.stringify({
        uidb64: data.uidb64 || data.uid,
        token: data.token,
        new_password: data.new_password,
      }),
    });
  },
};

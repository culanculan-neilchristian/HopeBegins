import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface HopeJourneySubscription {
  first_name: string;
  last_name: string;
  email: string;
  website?: string;
  last_name_honey?: string;
  start_time?: number;
}

export interface EmailTemplate {
  id: number;
  day_number: number;
  subject: string;
  html_content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem('adminToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

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

  getEmailTemplates: async (): Promise<EmailTemplate[]> => {
    return fetchWithAuth(`${config.API_URL}/daily-hope/templates/`, {
      headers: authHeader(),
    });
  },

  updateEmailTemplate: async (
    id: number,
    data: Partial<EmailTemplate>
  ): Promise<EmailTemplate> => {
    return fetchWithAuth(`${config.API_URL}/daily-hope/templates/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },
};

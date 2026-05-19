import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface PopoutItem {
  id: number;
  message: string;
  button_text: string;
  link: string;
  is_active: boolean;
}

export interface PopoutSettings {
  is_enabled: boolean;
  interval_seconds: number;
  items: PopoutItem[];
}

export interface JourneyContent {
  id: number;
  title: string;
  description: string;
  video_embed_url: string;
  updated_at: string;
}

const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem('adminToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const siteSettingsService = {
  getPublicPopouts: async (): Promise<PopoutSettings> => {
    return fetchWithAuth(`${config.API_URL}/popouts/public/`);
  },

  // Admin methods
  getSettings: async (): Promise<any> => {
    const data = await fetchWithAuth(`${config.API_URL}/popouts/settings/`, {
      headers: authHeader(),
    });
    return data[0];
  },

  updateSettings: async (id: number, data: any): Promise<any> => {
    return fetchWithAuth(`${config.API_URL}/popouts/settings/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },

  getItems: async (): Promise<PopoutItem[]> => {
    return fetchWithAuth(`${config.API_URL}/popouts/items/`, {
      headers: authHeader(),
    });
  },

  createItem: async (data: Partial<PopoutItem>): Promise<PopoutItem> => {
    return fetchWithAuth(`${config.API_URL}/popouts/items/`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },

  updateItem: async (
    id: number,
    data: Partial<PopoutItem>
  ): Promise<PopoutItem> => {
    return fetchWithAuth(`${config.API_URL}/popouts/items/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },

  deleteItem: async (id: number): Promise<void> => {
    await fetchWithAuth(`${config.API_URL}/popouts/items/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },

  // Journey Content
  getJourneyContent: async (): Promise<JourneyContent> => {
    return fetchWithAuth(`${config.API_URL}/popouts/journey-content/`);
  },

  updateJourneyContent: async (
    id: number,
    data: Partial<JourneyContent>
  ): Promise<JourneyContent> => {
    return fetchWithAuth(`${config.API_URL}/popouts/journey-content/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },
};

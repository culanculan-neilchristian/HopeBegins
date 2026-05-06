import api from './api';

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

export const siteSettingsService = {
  getPublicPopouts: async (): Promise<PopoutSettings> => {
    const response = await api.get('/popouts/public/');
    return response.data;
  },

  // Admin methods
  getSettings: async (): Promise<any> => {
    const response = await api.get('/popouts/settings/');
    return response.data[0];
  },

  updateSettings: async (id: number, data: any): Promise<any> => {
    const response = await api.patch(`/popouts/settings/${id}/`, data);
    return response.data;
  },

  getItems: async (): Promise<PopoutItem[]> => {
    const response = await api.get('/popouts/items/');
    return response.data;
  },

  createItem: async (data: Partial<PopoutItem>): Promise<PopoutItem> => {
    const response = await api.post('/popouts/items/', data);
    return response.data;
  },

  updateItem: async (id: number, data: Partial<PopoutItem>): Promise<PopoutItem> => {
    const response = await api.patch(`/popouts/items/${id}/`, data);
    return response.data;
  },

  deleteItem: async (id: number): Promise<void> => {
    await api.delete(`/popouts/items/${id}/`);
  }
};

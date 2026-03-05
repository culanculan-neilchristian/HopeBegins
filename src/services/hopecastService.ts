import { fetchWithAuth } from './api';
import { Category, Hopecast, HopecastListResponse } from '@/types/hopecast';
import { config } from '@/config';

export const hopecastService = {
  getCategories: async (): Promise<Category[]> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/categories/`);
  },

  getHopecasts: async (
    categoryId?: string | null,
    page: number = 1,
    pageSize: number = 10
  ): Promise<HopecastListResponse> => {
    const params = new URLSearchParams();
    if (categoryId) params.append('categories', categoryId);
    params.append('page', page.toString());
    params.append('page_size', pageSize.toString());

    return fetchWithAuth(`${config.API_URL}/hopecasts/?${params.toString()}`);
  },

  playHopecast: async (id: string): Promise<void> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/${id}/play/`, {
      method: 'POST',
    });
  },

  createHopecast: async (data: Partial<Hopecast>): Promise<Hopecast> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateHopecast: async (
    id: string,
    data: Partial<Hopecast>
  ): Promise<Hopecast> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

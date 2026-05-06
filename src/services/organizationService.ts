import { fetchWithAuth } from './api';
import { Organization, OrganizationPayload } from '@/types/admin';
import { config } from '@/config';

export const organizationService = {
  getOrganizations: async (): Promise<Organization[]> => {
    // Standard list endpoint
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/`);
  },

  getPublicOrganizations: async (): Promise<Organization[]> => {
    // The list endpoint is public for non-authenticated users as per backend logic
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/`);
  },

  createOrganization: async (data: OrganizationPayload): Promise<Organization> => {
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateOrganization: async (id: string, data: Partial<OrganizationPayload>): Promise<Organization> => {
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  deleteOrganization: async (id: string): Promise<void> => {
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/${id}/`, {
      method: 'DELETE',
    });
  },
};

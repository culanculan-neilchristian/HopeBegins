import { fetchWithAuth } from './api';
import { Organization, OrganizationPayload } from '@/types/admin';
import { config } from '@/config';

const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem('adminToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const organizationService = {
  getOrganizations: async (): Promise<Organization[]> => {
    // Admin list needs auth to see all (including inactive)
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/`, {
      headers: authHeader(),
    });
  },

  getPublicOrganizations: async (): Promise<Organization[]> => {
    // Public list for dropdowns
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/`);
  },

  createOrganization: async (
    data: OrganizationPayload
  ): Promise<Organization> => {
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },

  updateOrganization: async (
    id: string,
    data: Partial<OrganizationPayload>
  ): Promise<Organization> => {
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify(data),
    });
  },

  deleteOrganization: async (id: string): Promise<void> => {
    return fetchWithAuth(`${config.API_URL}/prayers/organizations/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },
};

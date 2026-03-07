import { config } from '@/config';
import { fetchWithAuth } from './api';
import type { Prayer } from '@/types/admin';

/**
 * Reads the carrier JWT from localStorage and returns an Authorization header.
 */
const authHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('carrierToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const carrierService = {
  /**
   * Fetch prayers based on status and assignment.
   * status: 'NEW' (Available), 'ASSIGNED' (My Prayers), 'PRAYED' (Completed)
   */
  getDashboardPrayers: async (status: string): Promise<Prayer[]> => {
    let url = `${config.API_URL}/prayers/requests/`;
    if (status === 'NEW') {
      url += '?status=NEW';
    } else if (status === 'ASSIGNED') {
      // The backend PrayerViewSet.get_queryset already filters Q(status='NEW') | Q(assigned_to=user)
      // We sub-filter by status=ASSIGNED to get specifically claimed ones
      url += '?status=ASSIGNED';
    } else if (status === 'PRAYED') {
      url += '?status=PRAYED';
    }

    const response = await fetchWithAuth(url, {
      headers: authHeader(),
    });

    // If paginated, return results
    if (response?.results) return response.results;
    return Array.isArray(response) ? response : [];
  },

  /**
   * Carrier claims a prayer.
   */
  claimPrayer: async (id: string): Promise<Prayer> => {
    return fetchWithAuth(`${config.API_URL}/prayers/requests/${id}/claim/`, {
      method: 'POST',
      headers: authHeader(),
    });
  },

  /**
   * Carrier marks a prayer as prayed.
   */
  markAsPrayed: async (id: string, note?: string): Promise<Prayer> => {
    const payload = note ? { note } : {};
    return fetchWithAuth(
      `${config.API_URL}/prayers/requests/${id}/mark_prayed/`,
      {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload),
      }
    );
  },

  /**
   * Get carrier stats.
   */
  getStats: async () => {
    // We can derive this from the user's prayerCount or a dedicated endpoint.
    // For now, let's assume the user object in localStorage has it,
    // or we fetch it from a profile/stats endpoint.
    // A simple way is to fetch counts from available categories.
    return fetchWithAuth(`${config.API_URL}/users/me/`, {
      headers: authHeader(),
    });
  },

  /**
   * Get all carrier prayers in a single call.
   */
  getCarrierDashboardData: async (userId: string) => {
    return fetchWithAuth(
      `${config.API_URL}/prayers/requests/carrier-dashboard/${userId}/`,
      {
        headers: authHeader(),
      }
    );
  },

  /**
   * Carrier starts praying for a request.
   */
  startPraying: async (id: string): Promise<Prayer> => {
    return fetchWithAuth(
      `${config.API_URL}/prayers/requests/${id}/start_praying/`,
      {
        method: 'POST',
        headers: authHeader(),
      }
    );
  },
};

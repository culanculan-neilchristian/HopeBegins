import { config } from '@/config';
import { fetchWithAuth } from './api';
import type {
  Prayer,
  PrayerStatus,
  AssignPrayerPayload,
  Hopecast,
  HopecastCategory,
  HopecastPayload,
  HopeCarrier,
  AdminStats,
  HopeJourney,
  PaginatedResponse,
} from '@/types/admin';

// ─────────────────────────────────────────────
// Helper: get the stored admin token
// ─────────────────────────────────────────────

/**
 * Reads the admin JWT from localStorage and returns an Authorization header.
 */
const authHeader = (): { Authorization: string } => {
  const token = localStorage.getItem('adminToken');
  if (!token) throw new Error('Admin token not found. Please log in again.');
  return { Authorization: `Bearer ${token}` };
};

// ─────────────────────────────────────────────
// Admin Auth
// ─────────────────────────────────────────────

export const adminService = {
  login: async (credentials: { email: string; password: string }) => {
    return fetchWithAuth(`${config.API_URL}/users/login/`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async () => {
    return fetchWithAuth(`${config.API_URL}/users/profile/`, {
      headers: authHeader(),
    });
  },

  logout: async (accessToken: string, refreshToken: string) => {
    return fetchWithAuth(`${config.API_URL}/users/logout/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ refresh: refreshToken }),
    });
  },

  // ─────────────────────────────────────────────
  // Prayers
  // ─────────────────────────────────────────────

  /**
   * Fetch all prayer requests.
   */
  getPrayers: async (): Promise<Prayer[]> => {
    return fetchWithAuth(`${config.API_URL}/prayers/requests/`, {
      headers: authHeader(),
    });
  },

  /**
   * Fetch a single prayer by its UUID.
   */
  getPrayer: async (id: string): Promise<Prayer> => {
    return fetchWithAuth(`${config.API_URL}/prayers/requests/${id}/`, {
      headers: authHeader(),
    });
  },

  /**
   * Update a prayer's status (e.g. mark as PRAYED or COMPLETED).
   */
  updatePrayerStatus: async (
    id: string,
    status: PrayerStatus
  ): Promise<Prayer> => {
    return fetchWithAuth(`${config.API_URL}/prayers/requests/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Assign a prayer to a carrier by carrier UUID.
   */
  assignPrayer: async (
    id: string,
    payload: AssignPrayerPayload
  ): Promise<Prayer> => {
    return fetchWithAuth(`${config.API_URL}/prayers/requests/${id}/assign/`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(payload),
    });
  },

  /**
   * Permanently delete a prayer request.
   * The backend returns 204 No Content on success (fetchWithAuth returns null).
   */
  deletePrayer: async (id: string): Promise<null> => {
    return fetchWithAuth(`${config.API_URL}/prayers/requests/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },

  // ─────────────────────────────────────────────
  // Hopecasts
  // ─────────────────────────────────────────────

  /**
   * Fetch all hopecasts.
   */
  getHopecasts: async (): Promise<Hopecast[]> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/`, {
      headers: authHeader(),
    });
  },

  /**
   * Fetch a single hopecast by UUID.
   */
  getHopecast: async (id: string): Promise<Hopecast> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/${id}/`, {
      headers: authHeader(),
    });
  },

  /**
   * Create a new hopecast. Admin only.
   * `categories` is an array of HopecastCategory UUIDs.
   */
  createHopecast: async (payload: HopecastPayload): Promise<Hopecast> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/`, {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(payload),
    });
  },

  /**
   * Update an existing hopecast. Admin only.
   * Uses PATCH so we only send what changed.
   */
  updateHopecast: async (
    id: string,
    payload: Partial<HopecastPayload>
  ): Promise<Hopecast> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify(payload),
    });
  },

  /**
   * Permanently delete a hopecast. Admin only.
   */
  deleteHopecast: async (id: string): Promise<null> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },

  // ─────────────────────────────────────────────
  // Hopecast Categories
  // ─────────────────────────────────────────────

  /**
   * Fetch all hopecast categories (used to populate the category dropdown).
   */
  getHopecastCategories: async (): Promise<HopecastCategory[]> => {
    return fetchWithAuth(`${config.API_URL}/hopecasts/categories/`, {
      headers: authHeader(),
    });
  },

  // ─────────────────────────────────────────────
  // Hope Carriers
  // ─────────────────────────────────────────────

  /**
   * Fetch all Hope Carriers - paginated with filtering.
   */
  getCarriers: async (
    page = 1,
    search = '',
    status: 'ALL' | 'PENDING' | 'ACTIVE' = 'ALL',
    ordering = '-date_joined'
  ): Promise<PaginatedResponse<HopeCarrier>> => {
    let url = `${config.API_URL}/users/?role=carrier&page=${page}`;
    if (search) url += `&search=${search}`;
    if (ordering) url += `&ordering=${ordering}`;

    if (status === 'PENDING') url += '&is_approved=0';
    if (status === 'ACTIVE') url += '&is_approved=1';

    return fetchWithAuth(url, {
      headers: authHeader(),
    });
  },

  /**
   * Approve a pending Hope Carrier.
   */
  approveCarrier: async (id: string): Promise<HopeCarrier> => {
    return fetchWithAuth(`${config.API_URL}/users/${id}/approve/`, {
      method: 'POST',
      headers: authHeader(),
    });
  },

  /**
   * Delete a Hope Carrier.
   */
  deleteCarrier: async (id: string): Promise<null> => {
    return fetchWithAuth(`${config.API_URL}/users/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },

  // ─────────────────────────────────────────────
  // Daily Hope Journeys
  // ─────────────────────────────────────────────

  /**
   * Fetch all Daily Hope journeys (subscribers) - paginated.
   */
  getJourneys: async (
    page = 1,
    search = ''
  ): Promise<PaginatedResponse<HopeJourney>> => {
    let url = `${config.API_URL}/daily-hope/journeys/?page=${page}`;
    if (search) url += `&search=${search}`;
    return fetchWithAuth(url, {
      headers: authHeader(),
    });
  },

  /**
   * Permanently delete a Daily Hope journey.
   */
  deleteJourney: async (id: string): Promise<null> => {
    return fetchWithAuth(`${config.API_URL}/daily-hope/journeys/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },

  // ─────────────────────────────────────────────
  // Dashboard / Overview
  // ─────────────────────────────────────────────

  /**
   * Fetch high-level admin dashboard stats.
   */
  getStats: async (): Promise<AdminStats> => {
    return fetchWithAuth(`${config.API_URL}/users/overview/`, {
      headers: authHeader(),
    });
  },
};

export default adminService;

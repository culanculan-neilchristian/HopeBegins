import { fetchWithAuth } from './api';
import { config } from '@/config';

export interface HopeStory {
  id: string;
  full_name: string;
  occupation?: string;
  testimonial: string;
  photo?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
  updated_at: string;
}

export interface HopeStoryCreate {
  full_name: string;
  occupation?: string;
  testimonial: string;
  photo?: File;
}

const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem('adminToken');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const hopeStoryService = {
  // Public
  submitStory: async (story: HopeStoryCreate) => {
    const formData = new FormData();
    formData.append('full_name', story.full_name);
    if (story.occupation) formData.append('occupation', story.occupation);
    formData.append('testimonial', story.testimonial);
    if (story.photo) formData.append('photo', story.photo);

    // fetchWithAuth automatically adds Content-Type: application/json if not specified,
    // but for FormData we MUST NOT set it manually or it breaks.
    // However, fetchWithAuth's default headers might interfere.
    // Let's check api.ts to see if it allows overriding headers.
    return fetchWithAuth(`${config.API_URL}/hope-stories/`, {
      method: 'POST',
      body: formData,
      // For FormData, we don't send headers to let the browser set the boundary
      headers: {},
    });
  },

  getApprovedStories: async () => {
    return fetchWithAuth(`${config.API_URL}/hope-stories/approved/`);
  },

  // Admin
  getAllStories: async () => {
    return fetchWithAuth(`${config.API_URL}/hope-stories/`, {
      headers: authHeader(),
    });
  },

  updateStoryStatus: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    return fetchWithAuth(`${config.API_URL}/hope-stories/${id}/`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify({ status }),
    });
  },

  deleteStory: async (id: string) => {
    return fetchWithAuth(`${config.API_URL}/hope-stories/${id}/`, {
      method: 'DELETE',
      headers: authHeader(),
    });
  },
};

export default hopeStoryService;

import api from './api';

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

const hopeStoryService = {
  // Public
  submitStory: async (story: HopeStoryCreate) => {
    const formData = new FormData();
    formData.append('full_name', story.full_name);
    if (story.occupation) formData.append('occupation', story.occupation);
    formData.append('testimonial', story.testimonial);
    if (story.photo) formData.append('photo', story.photo);

    const response = await api.post('/hope-stories/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getApprovedStories: async () => {
    const response = await api.get('/hope-stories/approved/');
    return response.data;
  },

  // Admin
  getAllStories: async () => {
    const response = await api.get('/hope-stories/');
    return response.data;
  },

  updateStoryStatus: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await api.patch(`/hope-stories/${id}/`, { status });
    return response.data;
  },

  deleteStory: async (id: string) => {
    const response = await api.delete(`/hope-stories/${id}/`);
    return response.data;
  },
};

export default hopeStoryService;

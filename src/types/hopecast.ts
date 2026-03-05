export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Hopecast {
  id: string;
  title: string;
  name: string;
  verse: string;
  mp4_link: string;
  category_details: Category[];
  play_times: number;
  author?: string;
  duration?: string;
  quote?: string;
  created_at: string;
  updated_at: string;
}

export interface HopecastListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Hopecast[];
}

export interface HopecastResponse {
  status: boolean;
  message: string;
  data: HopecastListResponse;
}

export interface CategoryResponse {
  status: boolean;
  message: string;
  data: Category[];
}

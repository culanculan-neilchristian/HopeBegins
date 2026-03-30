// ─────────────────────────────────────────────
// Shared / Utility Types
// ─────────────────────────────────────────────

/**
 * Standard paginated list response from the DRF backend.
 * Most list endpoints return { count, next, previous, results }.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─────────────────────────────────────────────
// Prayer Types
// ─────────────────────────────────────────────

export type PrayerCategory =
  | 'GENERAL'
  | 'ANXIETY_FEAR'
  | 'HEALTH'
  | 'FINANCE'
  | 'RELATIONSHIP'
  | 'OTHER';

export type PrayerStatus = 'NEW' | 'ASSIGNED' | 'ON_PROGRESS' | 'COMPLETED';

export interface PrayerResponse {
  id: string;
  prayer: string; // UUID of the parent Prayer
  content: string;
  user: string; // UUID of the responding user
  user_email: string;
  created_at: string;
}

/**
 * Full Prayer object as returned by AdminPrayerSerializer.
 * The admin gets all fields, including email, status, and assignment info.
 */
export interface Prayer {
  id: string;
  title: string;
  email: string;
  content: string;
  category: PrayerCategory;
  isAnonymous: boolean;
  shareFirstName: boolean;
  wantsFollowUp: boolean;
  status: PrayerStatus;
  assigned_to: string | null; // UUID of the assigned carrier user
  assigned_to_email: string | null;
  user: string | null; // UUID of the submitting user (if logged in)
  created_at: string;
  updated_at: string;
  responses: PrayerResponse[];
}

/** Payload for assigning a prayer to a carrier */
export interface AssignPrayerPayload {
  carrier_id: string;
}

// ─────────────────────────────────────────────
// Hopecast Types
// ─────────────────────────────────────────────

export interface HopecastCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Full Hopecast object as returned by HopecastSerializer.
 * Note: `categories` is write-only (array of UUIDs for creating/updating).
 * `category_details` is the read-only expanded version.
 * `play_times` is the read-only alias for play_count.
 */
export interface Hopecast {
  id: string;
  title: string;
  name: string;
  verse: string;
  mp4_link: string;
  category_details: HopecastCategory[];
  play_times: number;
  created_at: string;
  updated_at: string;
}

/** Payload for creating or editing a Hopecast */
export interface HopecastPayload {
  title: string;
  name: string;
  verse: string;
  mp4_link: string;
  categories: string[]; // Array of HopecastCategory UUIDs
}

// ─────────────────────────────────────────────
// Hope Carrier Types
// ─────────────────────────────────────────────

export interface HopeCarrier {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'carrier' | 'user';
  is_approved: boolean;
  first_name: string;
  last_name: string;
  phone: string | null;
  church_community: string | null;
  carrier_reason: string | null;
  agreed_to_guidelines: boolean;
  date_joined: string;
  prayer_count: number;
}

// ─────────────────────────────────────────────
// Admin Dashboard Stats Types
// ─────────────────────────────────────────────

/**
 * High-level stats shown on the admin overview dashboard.
 */
export interface TrendData {
  day: string;
  count: number;
}

export interface AdminStats {
  total_prayers: number;
  pending_prayers: number;
  total_carriers: number;
  hopecast_plays: number;
  total_users: number;
  journey_completions: number;
  recent_prayers: Prayer[];
  prayer_trend?: TrendData[];
  hopecast_trend?: TrendData[];
}

// ─────────────────────────────────────────────
// Donation Types
// ─────────────────────────────────────────────

export type DonationType = 'ONE_TIME' | 'MONTHLY';

export interface Donation {
  id: string;
  name: string;
  amount: number;
  donation_type: DonationType;
  date: string;
}

export interface DonationStats {
  totalRaised: number;
  totalDonors: number;
  monthlyTotal: number;
  avgDonation: number;
}
// ─────────────────────────────────────────────
// Daily Hope / Journey Types
// ─────────────────────────────────────────────

export interface HopeJourney {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  current_day: number;
  is_active: boolean;
  finished_at: string | null;
  created_at: string;
  updated_at: string;
}

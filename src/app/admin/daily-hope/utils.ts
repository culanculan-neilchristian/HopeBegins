import type { HopeJourney } from '@/types/admin';

export const DAILY_HOPE_TOTAL_DAYS = 21;

export function getCompletedHopeDays(journey: HopeJourney) {
  if (!journey.is_active || journey.finished_at) {
    return DAILY_HOPE_TOTAL_DAYS;
  }

  return Math.max(0, Math.min(DAILY_HOPE_TOTAL_DAYS, journey.current_day - 1));
}

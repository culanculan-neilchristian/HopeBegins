import { Clock, CheckCircle, UserCheck } from 'lucide-react';
import type { PrayerCategory, PrayerStatus } from '@/types/admin';

export const STATUS_CONFIG: Record<
  PrayerStatus,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  NEW: {
    label: 'New',
    icon: <Clock className="h-3 w-3" />,
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  ASSIGNED: {
    label: 'Assigned',
    icon: <UserCheck className="h-3 w-3" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  PRAYED: {
    label: 'Prayed',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  COMPLETED: {
    label: 'Completed',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'text-zinc-500',
    bg: 'bg-zinc-100 dark:bg-zinc-800',
  },
};

export const CATEGORY_CONFIG: Record<
  PrayerCategory,
  { label: string; color: string; bg: string; border: string }
> = {
  GENERAL: {
    label: 'General',
    color: 'text-zinc-600 dark:text-zinc-400',
    bg: 'bg-zinc-100 dark:bg-zinc-800',
    border: 'border-zinc-200 dark:border-zinc-700',
  },
  ANXIETY_FEAR: {
    label: 'Anxiety & Fear',
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
  },
  HEALTH: {
    label: 'Health',
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  FINANCE: {
    label: 'Finance',
    color: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
  },
  RELATIONSHIP: {
    label: 'Relationship',
    color: 'text-purple-700 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
  },
  OTHER: {
    label: 'Other',
    color: 'text-rose-700 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-200 dark:border-rose-800',
  },
};

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

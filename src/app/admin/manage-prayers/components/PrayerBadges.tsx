import { STATUS_CONFIG, CATEGORY_CONFIG } from '../constants';
import type { PrayerCategory, PrayerStatus } from '@/types/admin';

export function StatusBadge({ status }: { status: PrayerStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg}`}
    >
      <span className={cfg.color}>{cfg.icon}</span>
      <span
        className={`text-[10px] font-black uppercase tracking-widest ${cfg.color}`}
      >
        {cfg.label}
      </span>
    </div>
  );
}

export function CategoryBadge({ category }: { category: PrayerCategory }) {
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.OTHER;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${cfg.bg} ${cfg.color} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  );
}

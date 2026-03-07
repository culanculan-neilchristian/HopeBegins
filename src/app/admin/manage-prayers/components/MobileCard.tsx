import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { StatusBadge, CategoryBadge } from './PrayerBadges';
import { ExpandedDetail } from './ExpandedDetail';
import { formatDate } from '../constants';
import type { Prayer, PrayerCategory, PrayerStatus } from '@/types/admin';

interface MobileCardProps {
  prayer: Prayer;
  isExpanded: boolean;
  isUpdating: boolean;
  onToggle: () => void;
  onMarkPrayed: () => void;
  onStatusChange: (status: PrayerStatus) => void;
  onAssign: () => void;
  onDelete: () => void;
}

export function MobileCard({
  prayer,
  isExpanded,
  isUpdating,
  onToggle,
  onMarkPrayed,
  onAssign,
  onDelete,
}: MobileCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-zinc-900 overflow-hidden transition-all ${
        isExpanded
          ? 'border-brand shadow-lg shadow-brand/10'
          : 'border-zinc-100 dark:border-zinc-800 shadow-sm'
      }`}
    >
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {prayer.isAnonymous || !prayer.shareFirstName
                  ? 'Anonymous'
                  : prayer.title}
              </span>
              <CategoryBadge category={prayer.category as PrayerCategory} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={prayer.status} />
              <span className="text-xs text-zinc-400 font-medium">
                {formatDate(prayer.created_at)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 group"
            >
              <Trash2 className="h-4 w-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
            </button>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4">
          <ExpandedDetail
            prayer={prayer}
            onMarkPrayed={onMarkPrayed}
            onAssign={onAssign}
            isPending={isUpdating}
          />
        </div>
      )}
    </div>
  );
}

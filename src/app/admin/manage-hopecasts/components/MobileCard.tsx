import { Radio, Play, Edit2, ExternalLink, Trash2 } from 'lucide-react';
import { CategoryBadge, formatDate, formatPlays } from '../constants';
import type { Hopecast } from '@/types/admin';

interface MobileCardProps {
  cast: Hopecast;
  onEdit: () => void;
  onDelete: () => void;
}

export function MobileCard({ cast, onEdit, onDelete }: MobileCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 bg-brand-muted rounded-xl flex items-center justify-center text-brand">
          <Radio className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            {cast.title}
          </p>
          {(cast.name || cast.verse) && (
            <p className="text-[10px] text-zinc-500 font-medium mt-0.5 italic">
              {cast.name && <span>{cast.name}</span>}
              {cast.name && cast.verse && <span className="mx-1">•</span>}
              {cast.verse && <span>{cast.verse}</span>}
            </p>
          )}
          <p className="text-[10px] text-zinc-400 font-medium mt-1">
            {formatDate(cast.created_at)}
          </p>
        </div>
      </div>

      {cast.category_details?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {cast.category_details.map((cat, idx) => (
            <CategoryBadge key={cat.id} name={cat.name} index={idx} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-bold">
          <Play className="h-3 w-3 fill-zinc-400 text-zinc-400" />
          {formatPlays(cast.play_times)} plays
        </div>
        <div className="flex items-center gap-1">
          <a
            href={cast.mp4_link}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ExternalLink className="h-4 w-4 text-zinc-400" />
          </a>
          <button
            onClick={onEdit}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-brand-muted group"
          >
            <Edit2 className="h-4 w-4 text-zinc-400 group-hover:text-brand transition-colors" />
          </button>
          <button
            onClick={onDelete}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 group"
          >
            <Trash2 className="h-4 w-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}

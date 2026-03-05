import { Button } from '@/components/ui/button';
import { CheckCircle, UserCheck, MailCheck, Loader2 } from 'lucide-react';
import type { Prayer, PrayerStatus } from '@/types/admin';

interface ExpandedDetailProps {
  prayer: Prayer;
  onMarkPrayed: () => void;
  onStatusChange: (status: PrayerStatus) => void;
  onSendFollowUp: () => void;
  isPending: boolean;
}

export function ExpandedDetail({
  prayer,
  onMarkPrayed,
  onStatusChange,
  onSendFollowUp,
  isPending,
}: ExpandedDetailProps) {
  return (
    <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
      <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed text-sm w-full break-words overflow-hidden">
        {prayer.content}
      </p>

      {prayer.assigned_to_email && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">
              Assigned To
            </p>
            <p className="font-bold text-zinc-700 dark:text-zinc-300">
              {prayer.assigned_to_email}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-1">
        {prayer.status === 'NEW' && (
          <Button
            variant="ghost"
            onClick={() => onStatusChange('ASSIGNED')}
            disabled={isPending}
            className="h-8 sm:h-9 px-3 sm:px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-widest border-0"
          >
            <UserCheck className="h-3 w-3 mr-1.5" />
            Mark as Assigned
          </Button>
        )}

        {prayer.status !== 'PRAYED' && prayer.status !== 'COMPLETED' && (
          <Button
            onClick={onMarkPrayed}
            disabled={isPending}
            className="h-8 sm:h-9 px-3 sm:px-5 rounded-xl bg-brand text-brand-foreground hover:bg-brand-hover font-bold text-xs uppercase tracking-widest"
          >
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <>
                <CheckCircle className="h-3 w-3 mr-1.5" />
                Mark as Prayed
              </>
            )}
          </Button>
        )}

        {prayer.status === 'PRAYED' && (
          <Button
            variant="ghost"
            onClick={() => onStatusChange('COMPLETED')}
            disabled={isPending}
            className="h-8 sm:h-9 px-3 sm:px-5 rounded-xl bg-zinc-700 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest border-0"
          >
            <CheckCircle className="h-3 w-3 mr-1.5" />
            Mark as Completed
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={onSendFollowUp}
          className="h-8 sm:h-9 px-3 sm:px-5 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-bold text-xs uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <MailCheck className="h-3 w-3 mr-1.5" />
          Send Follow-Up
        </Button>
      </div>
    </div>
  );
}

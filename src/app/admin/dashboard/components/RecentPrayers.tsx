import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Prayer } from '@/types/admin';
import { format } from 'date-fns';

interface RecentPrayersProps {
  prayers: Prayer[] | undefined;
}

export function RecentPrayers({ prayers }: RecentPrayersProps) {
  if (!prayers || prayers.length === 0) return null;

  return (
    <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900">
      <CardHeader className="px-6 pt-6 pb-4 border-b border-zinc-50 dark:border-zinc-800">
        <CardTitle className="text-lg font-black italic">
          Recent Prayers
        </CardTitle>
        <p className="text-xs text-zinc-500 font-medium mt-0.5">
          Latest 5 prayer requests submitted.
        </p>
      </CardHeader>
      <div className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
        {prayers.map((prayer) => (
          <div
            key={prayer.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 rounded-xl bg-brand/5 dark:bg-brand/10 flex items-center justify-center text-brand font-black text-xs flex-shrink-0">
                {prayer.isAnonymous ? 'A' : prayer.email[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                  {prayer.title}
                </p>
                <p className="text-xs text-zinc-400 font-medium">
                  {prayer.isAnonymous ? 'Anonymous' : prayer.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  prayer.status === 'NEW'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'
                    : prayer.status === 'PRAYED'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                      : prayer.status === 'ASSIGNED'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                }`}
              >
                {prayer.status}
              </span>
              <span className="text-xs text-zinc-400 font-medium whitespace-nowrap">
                {format(new Date(prayer.created_at), 'MMM d')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

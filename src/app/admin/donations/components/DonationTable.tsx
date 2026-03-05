import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface Donation {
  id: string;
  name: string;
  date: string;
  type: string;
  amount: number;
}

function TypeBadge({ type }: { type: string }) {
  const isMonthly = type === 'MONTHLY';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
        isMonthly
          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
          : 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
      }`}
    >
      {isMonthly ? 'Monthly' : 'One-Time'}
    </span>
  );
}

function SortIcon({
  field,
  sortBy,
  dir,
}: {
  field: string;
  sortBy: string;
  dir: 'asc' | 'desc';
}) {
  if (sortBy !== field)
    return <ChevronsUpDown className="h-3 w-3 text-zinc-300" />;
  return dir === 'asc' ? (
    <ChevronUp className="h-3 w-3 text-brand" />
  ) : (
    <ChevronDown className="h-3 w-3 text-brand" />
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface DonationTableProps {
  filtered: Donation[];
  search: string;
  setSearch: (s: string) => void;
  typeFilter: 'ALL' | 'ONE_TIME' | 'MONTHLY';
  setTypeFilter: (t: 'ALL' | 'ONE_TIME' | 'MONTHLY') => void;
  sortBy: 'date' | 'amount';
  sortDir: 'asc' | 'desc';
  onSort: (field: 'date' | 'amount') => void;
}

export function DonationTable({
  filtered,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  sortBy,
  sortDir,
  onSort,
}: DonationTableProps) {
  return (
    <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
      <CardHeader className="px-6 pt-6 pb-4 border-b border-zinc-50 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-black italic tracking-tight">
              All Donations
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              {filtered.length} records
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              {(['ALL', 'ONE_TIME', 'MONTHLY'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    typeFilter === t
                      ? 'bg-white dark:bg-zinc-700 text-brand shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                  }`}
                >
                  {t === 'ONE_TIME'
                    ? 'One-Time'
                    : t === 'MONTHLY'
                      ? 'Monthly'
                      : 'All'}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <Input
                placeholder="Search donors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 rounded-xl border-none bg-zinc-50 dark:bg-zinc-800 text-xs font-medium w-44 focus-visible:ring-brand/20"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Donor
          </span>
          <button
            onClick={() => onSort('date')}
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            Date <SortIcon field="date" sortBy={sortBy} dir={sortDir} />
          </button>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Type
          </span>
          <button
            onClick={() => onSort('amount')}
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors justify-end"
          >
            Amount <SortIcon field="amount" sortBy={sortBy} dir={sortDir} />
          </button>
        </div>

        <div className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-bold text-zinc-400 text-sm">
                No donations match your filters.
              </p>
            </div>
          ) : (
            filtered.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-6 py-4 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-brand/5 dark:bg-brand/10 flex items-center justify-center text-brand font-black text-xs flex-shrink-0">
                    {d.name[0]}
                  </div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {d.name}
                  </p>
                </div>
                <p className="text-xs font-medium text-zinc-400 whitespace-nowrap">
                  {formatDate(d.date)}
                </p>
                <TypeBadge type={d.type} />
                <p className="font-black text-sm text-zinc-900 dark:text-zinc-100 tabular-nums text-right whitespace-nowrap">
                  ${d.amount}
                  {d.type === 'MONTHLY' ? '/mo' : ''}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

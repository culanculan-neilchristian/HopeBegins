import { Button } from '@/components/ui/button';
import { X, UserCheck, Loader2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { Prayer, HopeCarrier } from '@/types/admin';

interface AssignCarrierModalProps {
  prayer: Prayer;
  carriers: HopeCarrier[];
  onConfirm: (carrierId: string) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function AssignCarrierModal({
  prayer,
  carriers,
  onConfirm,
  onCancel,
  isPending,
}: AssignCarrierModalProps) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredCarriers = useMemo(() => {
    return carriers.filter((c) => {
      const q = search.toLowerCase();
      return (
        c.first_name.toLowerCase().includes(q) ||
        c.last_name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    });
  }, [carriers, search]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/20 flex flex-col max-h-[90vh]">
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="h-4 w-4 text-zinc-500" />
        </button>

        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 mb-6 shrink-0">
          <UserCheck className="h-6 w-6 text-teal-600" />
        </div>

        <h2 className="text-2xl font-black tracking-tight mb-2 shrink-0">
          Assign to Carrier
        </h2>
        <p className="text-zinc-500 font-medium mb-4 shrink-0">
          Choose a carrier to handle:{' '}
          <span className="text-zinc-900 dark:text-zinc-100 font-bold ml-1">
            &ldquo;{prayer.title}&rdquo;
          </span>
        </p>

        <div className="relative mb-6 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search carriers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 space-y-2 mb-8 pr-2 custom-scrollbar">
          {filteredCarriers.length === 0 ? (
            <div className="py-8 text-center text-zinc-400 text-sm font-medium italic">
              No carriers found...
            </div>
          ) : (
            filteredCarriers.map((carrier) => {
              const isSelected = selectedId === carrier.id;
              return (
                <button
                  key={carrier.id}
                  onClick={() => setSelectedId(carrier.id)}
                  disabled={isPending}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group border ${
                    isSelected
                      ? 'bg-brand/10 border-brand shadow-sm shadow-brand/10'
                      : 'bg-white dark:bg-zinc-900 border-transparent hover:bg-brand-muted/10 dark:hover:bg-brand/5 hover:border-brand/20'
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs uppercase ${
                      isSelected
                        ? 'bg-brand text-white'
                        : 'bg-brand-muted dark:bg-brand/10 text-brand'
                    }`}
                  >
                    {carrier.first_name[0]}
                    {carrier.last_name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-bold truncate ${
                        isSelected
                          ? 'text-brand'
                          : 'text-zinc-900 dark:text-zinc-100'
                      }`}
                    >
                      {carrier.first_name} {carrier.last_name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {carrier.email}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-xs font-black italic ${
                        isSelected ? 'text-brand' : 'text-brand'
                      }`}
                    >
                      {carrier.prayer_count}
                    </div>
                    <div className="text-[8px] font-black uppercase tracking-tight text-zinc-400">
                      Active
                    </div>
                  </div>
                  <div
                    className={`transition-all ml-1 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <UserCheck
                      className={`h-4 w-4 ${
                        isSelected ? 'text-brand' : 'text-zinc-300'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="flex gap-3 shrink-0">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedId && onConfirm(selectedId)}
            disabled={isPending || !selectedId}
            className="flex-1 h-12 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold shadow-lg shadow-brand/20"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Confirm'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

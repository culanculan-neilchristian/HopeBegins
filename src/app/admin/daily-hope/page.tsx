'use client';

import {
  AlertCircle,
  RefreshCw,
  Search,
  Users,
  Trash2,
  Calendar,
  Mail,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useHopeJourneys } from './hooks/useHopeJourneys';
import { JourneyTable } from './components/JourneyTable';
import { DeleteJourneyModal } from './components/DeleteJourneyModal';

export default function DailyHopeAdminPage() {
  const {
    journeys,
    totalCount,
    hasNext,
    hasPrev,
    isLoading,
    isFetching,
    isError,
    refetch,
    search,
    setSearch,
    page,
    setPage,
    deleteTarget,
    setDeleteTarget,
    deleteMutation,
  } = useHopeJourneys();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center border border-red-100 dark:border-red-900/10">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight italic">
          Failed to load subscribers
        </h2>
        <p className="text-zinc-500 font-medium">
          Check your connection or try again.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-2 h-11 px-8 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest text-xs shadow-lg transition-all"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      {deleteTarget && (
        <DeleteJourneyModal
          journey={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-12 max-w-[1600px] mx-auto min-h-screen">
        {/* ── Header ── */}
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic tracking-tighter text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="h-12 w-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              Hope Subscribers
            </h1>
            <p className="text-zinc-500 font-medium text-sm sm:text-lg flex items-center gap-2">
              Managing everyone currently in the 30-day &quot;Daily Hope&quot;
              journey.
              {!isLoading && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-black uppercase tracking-widest text-zinc-400">
                  {totalCount} total
                  {isFetching && (
                    <RefreshCw className="h-3 w-3 animate-spin text-brand" />
                  )}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-96 flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-12 rounded-2xl border-none bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-brand font-medium w-full transition-all"
              />
            </div>
          </div>
        </header>

        {/* ── Mobile Layout (Cards) ── */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {(isLoading || isFetching) &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 animate-pulse"
              />
            ))}

          {!isLoading && !isFetching && journeys.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl flex items-center justify-center border border-dashed border-zinc-200 dark:border-zinc-700">
                <Search className="h-6 w-6 text-zinc-300" />
              </div>
              <p className="font-bold text-zinc-500">
                {search ? 'No match found.' : 'No subscribers yet.'}
              </p>
            </div>
          )}

          {!isLoading &&
            !isFetching &&
            journeys.map((journey) => (
              <div
                key={journey.id}
                className="group p-5 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-lg shadow-zinc-200/40 dark:shadow-none hover:shadow-xl hover:border-brand-muted transition-all relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-brand-muted rounded-xl flex items-center justify-center text-brand">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-zinc-900 dark:text-white truncate max-w-[180px]">
                        {journey.first_name} {journey.last_name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        Day {journey.current_day}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(journey)}
                    className="h-8 w-8 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    {journey.email}
                  </p>
                  <div className="pt-3 border-t border-zinc-50 dark:border-zinc-800 flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 uppercase">
                      <Calendar className="h-3 w-3" />
                      Joined {new Date(journey.created_at).toLocaleDateString()}
                    </span>
                    {journey.is_active ? (
                      <span className="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase text-zinc-400">
                        Finished
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {/* ── Mobile Pagination ── */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={!hasPrev || isLoading || isFetching}
                onClick={() => setPage(page - 1)}
                className="h-10 rounded-xl font-bold border-zinc-200 flex-1 mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <div className="px-4 text-xs font-black text-zinc-400">
                {page} / {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={!hasNext || isLoading || isFetching}
                onClick={() => setPage(page + 1)}
                className="h-10 rounded-xl font-bold border-zinc-200 flex-1 ml-2"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* ── Desktop Layout (Table) ── */}
        <div className="hidden md:block">
          <JourneyTable
            filtered={journeys}
            isLoading={isLoading || isFetching}
            search={search}
            onDelete={setDeleteTarget}
            page={page}
            setPage={setPage}
            totalCount={totalCount}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </div>

        {/* ── Footer Stats ── */}
        {!isLoading && totalCount > 0 && (
          <footer className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-brand-muted/10 rounded-3xl border border-brand-muted/20">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand">
                  Total Database
                </span>
                <span className="text-2xl font-black italic">{totalCount}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-zinc-500 italic max-w-xs">
                Subscribers will automatically progress through the journey day
                by day.
              </p>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}

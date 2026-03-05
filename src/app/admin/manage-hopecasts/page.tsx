'use client';

import { AlertCircle, RefreshCw, Search, Plus, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useManageHopecasts } from './hooks/useManageHopecasts';
import { DeleteModal } from './components/DeleteModal';
import { HopecastModal } from './components/HopecastModal';
import { MobileCard } from './components/MobileCard';
import { HopecastTable } from './components/HopecastTable';

export default function ManageHopecastsPage() {
  const {
    hopecasts,
    filtered,
    categories,
    isLoadingCasts,
    isErrorCasts,
    refetch,
    search,
    setSearch,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    deleteMutation,
    isSavePending,
    handleSave,
  } = useManageHopecasts();

  if (isErrorCasts) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load hopecasts
        </h2>
        <p className="text-zinc-500 font-medium">
          Check your connection or try again.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-2 h-10 px-6 rounded-xl bg-brand text-brand-foreground font-bold"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          hopecast={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      {editTarget !== undefined && (
        <HopecastModal
          initial={editTarget}
          categories={categories}
          onSave={handleSave}
          onClose={() => setEditTarget(undefined)}
          isPending={isSavePending}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10">
        {/* ── Header ── */}
        <header className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter whitespace-nowrap">
              Manage Hopecasts
            </h1>
            <p className="text-zinc-500 font-medium text-sm sm:text-base">
              Publish and organise your audio content.
              {!isLoadingCasts && (
                <span className="ml-2 text-zinc-400">
                  {hopecasts.length} total
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-shrink-0">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search hopecasts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-xl border-none bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-200/50 w-full"
              />
            </div>
            <Button
              onClick={() => setEditTarget(null)}
              className="h-10 px-5 rounded-xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold text-xs uppercase tracking-widest shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Cast
            </Button>
          </div>
        </header>

        {/* ── Mobile: card list ── */}
        <div className="md:hidden space-y-3">
          {isLoadingCasts &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 animate-pulse"
              />
            ))}
          {!isLoadingCasts && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Radio className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="font-bold text-zinc-500">
                {search
                  ? 'No hopecasts match your search.'
                  : 'No hopecasts yet.'}
              </p>
              <Button
                onClick={() => setEditTarget(null)}
                className="h-9 px-5 rounded-xl bg-brand text-brand-foreground font-bold text-xs"
              >
                <Plus className="h-3 w-3 mr-1.5" />
                Create your first cast
              </Button>
            </div>
          )}
          {!isLoadingCasts &&
            filtered.map((cast) => (
              <MobileCard
                key={cast.id}
                cast={cast}
                onEdit={() => setEditTarget(cast)}
                onDelete={() => setDeleteTarget(cast)}
              />
            ))}
        </div>

        {/* ── Desktop: table ── */}
        <HopecastTable
          filtered={filtered}
          isLoading={isLoadingCasts}
          search={search}
          onEdit={(cast) => setEditTarget(cast)}
          onDelete={(cast) => setDeleteTarget(cast)}
          onCreateFirst={() => setEditTarget(null)}
        />
      </div>
    </>
  );
}

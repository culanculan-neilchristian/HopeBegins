'use client';

import { AlertCircle, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useManagePrayers } from './hooks/useManagePrayers';
import { DeleteModal } from './components/DeleteModal';
import { MobileCard } from './components/MobileCard';
import { PrayerTable } from './components/PrayerTable';
import type { PrayerStatus } from '@/types/admin';

export default function ManagePrayersPage() {
  const {
    filtered,
    prayers,
    isLoading,
    isError,
    refetch,
    search,
    setSearch,
    expandedId,
    deleteTarget,
    setDeleteTarget,
    statusFilter,
    setStatusFilter,
    deleteMutation,
    statusMutation,
    handleToggle,
    handleMarkPrayed,
    handleStatusChange,
    handleSendFollowUp,
  } = useManagePrayers();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load prayers
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
          prayer={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10">
        {/* ── Header ── */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter whitespace-nowrap">
              Manage Prayers
            </h1>
            <p className="text-zinc-500 font-medium text-sm sm:text-base">
              Review, moderate, and organize community requests.
              {!isLoading && (
                <span className="ml-2 text-zinc-400">
                  {prayers.length} total
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as PrayerStatus | 'ALL')
              }
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 h-10 text-xs font-bold text-zinc-700 dark:text-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30 w-full sm:w-auto"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="PRAYED">Prayed</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search prayers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 rounded-xl border-none bg-white dark:bg-zinc-900 shadow-lg shadow-zinc-200/50 w-full"
              />
            </div>
          </div>
        </header>

        {/* ── Mobile: Card list ── */}
        <div className="md:hidden space-y-3">
          {isLoading &&
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 animate-pulse"
              />
            ))}
          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-zinc-400" />
              </div>
              <p className="font-bold text-zinc-500">
                {search || statusFilter !== 'ALL'
                  ? 'No prayers match your filters.'
                  : 'No prayer requests yet.'}
              </p>
            </div>
          )}
          {!isLoading &&
            filtered.map((prayer) => (
              <MobileCard
                key={prayer.id}
                prayer={prayer}
                isExpanded={expandedId === prayer.id}
                isUpdating={
                  statusMutation.isPending &&
                  statusMutation.variables?.id === prayer.id
                }
                onToggle={() => handleToggle(prayer.id)}
                onMarkPrayed={() => handleMarkPrayed(prayer)}
                onStatusChange={(status) => handleStatusChange(prayer, status)}
                onSendFollowUp={() => handleSendFollowUp(prayer)}
                onDelete={() => setDeleteTarget(prayer)}
              />
            ))}
        </div>

        {/* ── Desktop: Table ── */}
        <PrayerTable
          filtered={filtered}
          isLoading={isLoading}
          expandedId={expandedId}
          statusMutationPending={statusMutation.isPending}
          statusMutationVariableId={statusMutation.variables?.id}
          search={search}
          statusFilter={statusFilter}
          onToggle={handleToggle}
          onMarkPrayed={handleMarkPrayed}
          onStatusChange={handleStatusChange}
          onSendFollowUp={handleSendFollowUp}
          onDelete={(p) => setDeleteTarget(p)}
        />
      </div>
    </>
  );
}

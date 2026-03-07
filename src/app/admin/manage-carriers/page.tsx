'use client';

import { AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useManageCarriers } from './hooks/useManageCarriers';
import { CarrierCard } from './components/CarrierCard';
import { CarrierDetailModal } from './components/CarrierDetailModal';
import { DeleteCarrierModal } from './components/DeleteCarrierModal';

export default function ManageCarriersPage() {
  const {
    filteredCarriers,
    totalCount,
    page,
    setPage,
    hasNext,
    hasPrev,
    isLoading,
    isFetching,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    selectedCarrier,
    setSelectedCarrier,
    approveMutation,
    handleApprove,
    deleteMutation,
    deleteTarget,
    setDeleteTarget,
  } = useManageCarriers();

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if ((isLoading || isFetching) && page === 1 && !searchQuery) {
    return (
      <div className="p-8 space-y-4">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 w-full bg-zinc-100 dark:bg-zinc-800/50 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10 max-w-7xl mx-auto min-h-screen">
      {deleteTarget && (
        <DeleteCarrierModal
          carrier={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}

      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter whitespace-nowrap">
            Manage Hope Carriers
          </h1>
          <p className="text-zinc-500 font-medium text-sm sm:text-base">
            Review and approve volunteers supporting the community.
            {totalCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                {totalCount} Total
              </span>
            )}
          </p>
        </div>

        {/* Controls Group */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
          {/* Status Toggle Pills */}
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl w-full sm:w-fit">
            {(['ALL', 'PENDING', 'ACTIVE'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-white dark:bg-zinc-700 text-brand shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 h-10 text-xs font-bold text-zinc-700 dark:text-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/30 w-full sm:w-auto"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name (A–Z)</option>
            <option value="prayers">Most Prayers</option>
          </select>

          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search carriers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-white dark:bg-zinc-900 border-none shadow-lg shadow-zinc-200/50 dark:shadow-none rounded-xl text-sm font-medium ring-offset-transparent focus-visible:ring-brand/20 transition-all w-full"
            />
          </div>
        </div>
      </header>

      {/* ── List ── */}
      <div className="space-y-4">
        {(isLoading || isFetching) && page > 1 && (
          <div className="flex items-center justify-center py-4">
            <div className="h-4 bg-zinc-100 dark:bg-zinc-800 w-24 animate-pulse rounded-full" />
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {!isLoading && !isFetching && filteredCarriers.length > 0
            ? filteredCarriers.map((carrier: any) => (
                <CarrierCard
                  key={carrier.id}
                  carrier={carrier}
                  onSelect={setSelectedCarrier}
                  onApprove={handleApprove}
                  isApproving={
                    approveMutation.isPending &&
                    approveMutation.variables === carrier.id
                  }
                  onDelete={() => setDeleteTarget(carrier)}
                  isDeleting={
                    deleteMutation.isPending &&
                    deleteMutation.variables === carrier.id
                  }
                />
              ))
            : !isLoading &&
              !isFetching && (
                <div className="py-20 text-center space-y-4">
                  <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 italic">
                    No carriers found
                  </h3>
                  <p className="text-zinc-500 max-w-xs mx-auto font-medium">
                    Try adjusting your search or filters to find what
                    you&apos;re looking for.
                  </p>
                </div>
              )}
        </AnimatePresence>
      </div>

      {/* ── Pagination UI ── */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-none">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Showing{' '}
            <span className="text-zinc-900 dark:text-zinc-100">
              {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, totalCount)}
            </span>{' '}
            of{' '}
            <span className="text-zinc-900 dark:text-zinc-100">
              {totalCount}
            </span>{' '}
            carriers
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPrev || isLoading || isFetching}
              onClick={() => {
                setPage(page - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-10 rounded-xl font-bold border-zinc-200 dark:border-zinc-700 px-6 shadow-sm disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            <div className="px-4 text-xs font-black text-brand">
              Page {page}{' '}
              <span className="text-zinc-400 font-medium">/ {totalPages}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasNext || isLoading || isFetching}
              onClick={() => {
                setPage(page + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-10 rounded-xl font-bold border-zinc-200 dark:border-zinc-700 px-6 shadow-sm disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedCarrier && (
        <CarrierDetailModal
          carrier={selectedCarrier}
          onClose={() => setSelectedCarrier(null)}
          onApprove={handleApprove}
          isApproving={approveMutation.isPending}
        />
      )}
    </div>
  );
}

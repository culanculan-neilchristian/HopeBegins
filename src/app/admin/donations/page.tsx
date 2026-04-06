'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Gift,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useDonations } from './hooks/useDonations';
import { DonationTable } from './components/DonationTable';
import { DonationModal } from './components/DonationModal';
import { DeleteDonationModal } from './components/DeleteDonationModal';

export default function DonationsPage() {
  const {
    // Data
    filtered,
    stats,
    isLoading,
    isFetching,
    totalCount,
    totalPages,

    // State
    search,
    setSearch,
    page,
    setPage,
    typeFilter,
    setTypeFilter,
    sortBy,
    sortDir,
    handleSort,

    // Modals
    editTarget,
    setEditTarget,
    deleteTarget,
    setDeleteTarget,

    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,
    isPending,
  } = useDonations();

  const STAT_CONFIG = [
    {
      label: 'Total Raised',
      value: `₱${stats.totalRaised.toLocaleString()}`,
      icon: Gift,
      color: 'text-brand',
      bg: 'bg-brand/5',
      trend: stats.totalRaised > 0 ? '+15.2%' : '0%',
    },
    {
      label: 'Donors',
      value: String(stats.totalDonors),
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      trend: stats.totalDonors > 0 ? '+8 this mo' : '0',
    },
    {
      label: 'Monthly',
      value: `₱${stats.monthlyTotal}/mo`,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      trend: stats.monthlyTotal > 0 ? '+3 recurring' : '0',
    },
    {
      label: 'Avg. Donation',
      value: `₱${stats.avgDonation}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      trend: stats.avgDonation > 0 ? '+2.4%' : '0%',
    },
  ];

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* ── Modals ── */}
      {editTarget !== undefined && (
        <DonationModal
          initial={editTarget}
          onSave={(payload) => {
            if (editTarget) {
              updateMutation.mutate({ id: editTarget.id, payload });
            } else {
              createMutation.mutate(payload);
            }
          }}
          onClose={() => setEditTarget(undefined)}
          isPending={isPending}
        />
      )}

      {deleteTarget && (
        <DeleteDonationModal
          donation={deleteTarget}
          onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
          isPending={isPending}
        />
      )}

      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">
            Hope Seeds
          </h1>
          <p className="mt-2 text-zinc-500 font-medium text-sm flex items-center gap-2">
            Track donations, campaign performance, and financial goals.
            {isFetching && (
              <RefreshCw className="h-3 w-3 animate-spin text-brand" />
            )}
          </p>
        </div>
        <Button
          onClick={() => setEditTarget(null)}
          className="h-11 px-6 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest text-xs shadow-lg transition-all transform hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" /> Record Donation
        </Button>
      </header>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CONFIG.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
          >
            <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0 px-4 pt-4">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-600 transition-colors">
                  {stat.label}
                </CardTitle>
                <div
                  className={`p-1.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="py-0 px-4 pb-4">
                <div className="text-2xl font-black tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                  {isLoading ? '---' : stat.value}
                </div>
                {!isLoading && (
                  <div className="flex items-center gap-1 text-[10px] font-black mt-1 text-emerald-500 uppercase tracking-widest">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.trend}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="space-y-4">
        <DonationTable
          filtered={filtered}
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={handleSort}
          onEdit={setEditTarget}
          onDelete={setDeleteTarget}
        />

        {/* ── Pagination ── */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-zinc-400 font-black uppercase tracking-widest">
              Page {page} of {totalPages} — {totalCount} Records
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1 || isFetching}
                onClick={() => setPage(page - 1)}
                className="h-10 rounded-xl font-bold border-zinc-200 dark:border-zinc-800 text-xs px-4"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages || isFetching}
                onClick={() => setPage(page + 1)}
                className="h-10 rounded-xl font-bold border-zinc-200 dark:border-zinc-800 text-xs px-4"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

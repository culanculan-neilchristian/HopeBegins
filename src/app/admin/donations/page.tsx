'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Gift,
  Users,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDonations } from './hooks/useDonations';
import { DonationTable } from './components/DonationTable';

export default function DonationsPage() {
  const {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    sortDir,
    handleSort,
    filtered,
    stats,
  } = useDonations();

  const STAT_CONFIG = [
    {
      label: 'Total Raised',
      value: `$${stats.totalRaised.toLocaleString()}`,
      icon: Gift,
      color: 'text-brand',
      bg: 'bg-brand/5',
      trend: '+15.2%',
    },
    {
      label: 'Donors',
      value: String(stats.totalDonors),
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      trend: '+8 this mo',
    },
    {
      label: 'Monthly',
      value: `$${stats.monthlyTotal}/mo`,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      trend: '+3 recurring',
    },
    {
      label: 'Avg. Donation',
      value: `$${stats.avgDonation}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      trend: '+2.4%',
    },
  ];

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter whitespace-nowrap">
            Hope Seeds
          </h1>
          <p className="text-zinc-500 font-medium text-sm">
            Track donations, campaign performance, and financial goals.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-sm flex-shrink-0 self-start">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
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
            <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-0 px-4 pt-4">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  {stat.label}
                </CardTitle>
                <div className={`p-1.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="py-0 px-4 pb-4">
                <div className="text-2xl font-black tabular-nums text-zinc-900 dark:text-zinc-100">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold mt-1 text-emerald-500">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Table ── */}
      <DonationTable
        filtered={filtered}
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={handleSort}
      />
    </div>
  );
}

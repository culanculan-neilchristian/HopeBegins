'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboard, CHART_DATA } from './hooks/useDashboard';
import { StatCards } from './components/StatCards';
import { DashboardCharts } from './components/DashboardCharts';
import { RecentPrayers } from './components/RecentPrayers';

export default function AdminDashboard() {
  const { stats, isLoading, isError, refetch } = useDashboard();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load dashboard
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
    <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter whitespace-nowrap">
            The Hope Desk
          </h1>
          <p className="text-zinc-500 font-medium text-sm">
            System-wide overview and live performance data.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-brand text-brand-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-hover transition-all">
            System Status: OK
          </button>
        </div>
      </header>

      {/* ── Stat Cards ── */}
      <StatCards stats={stats} isLoading={isLoading} />

      {/* ── Charts ── */}
      <DashboardCharts data={CHART_DATA} />

      {/* ── Recent Prayers ── */}
      <RecentPrayers prayers={stats?.recent_prayers} />

      {/* ── Support Banner ── */}
      <div className="bg-brand rounded-3xl p-8 sm:p-12 text-brand-foreground flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight">
            Need Immediate Assistance?
          </h2>
          <p className="opacity-80 font-medium text-sm">
            Contact the technical support team or review active platform alerts.
          </p>
        </div>
        <button className="px-8 py-3 bg-brand-foreground text-brand rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex-shrink-0">
          Open Support Ticket
        </button>
      </div>
    </div>
  );
}

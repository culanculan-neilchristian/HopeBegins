'use client';

import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, Inbox, Sparkles, Loader2 } from 'lucide-react';
import { useCarrierDashboard } from './hooks/useCarrierDashboard';
import { PrayerCard } from './components/PrayerCard';

function DashboardContent() {
  const {
    prayers,
    counts,
    currentTab,
    setTab,
    isLoading,
    isFetching,
    completeMutation,
    startMutation,
    user,
  } = useCarrierDashboard();

  const tabs = [
    { id: 'available', label: `Assigned (${counts.available})`, icon: Inbox },
    {
      id: 'my-prayers',
      label: `Lifting (${counts.myPrayers})`,
      icon: Heart,
    },
    {
      id: 'completed',
      label: `Completed (${counts.completed})`,
      icon: CheckCircle2,
    },
  ] as const;

  return (
    <div className="space-y-8 pb-20">
      {/* ── Header & Stats ── */}
      <header className="relative py-6 md:p-10 bg-[#b4c392]/10 dark:bg-zinc-900 rounded-[3rem] border border-[#b4c392]/20 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Sparkles className="h-40 w-40 text-[#b4c392]" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-50">
              Welcome back, {user?.first_name || 'Hope Carrier'}
            </h1>
            <p className="text-zinc-500 font-medium text-lg">
              Your prayers are making a difference.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white dark:bg-zinc-950 px-6 py-4 rounded-[2rem] shadow-xl shadow-[#b4c392]/10 border border-[#b4c392]/5 text-center min-w-[160px] transform hover:scale-105 transition-transform duration-500">
              {isLoading || isFetching ? (
                <div className="h-10 w-16 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse mx-auto mb-1" />
              ) : (
                <div className="text-4xl font-black text-[#b4c392] mb-1">
                  {counts.completed}
                </div>
              )}
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Prayers Lifted
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-950 px-6 py-4 rounded-[2rem] shadow-xl shadow-[#b4c392]/10 border border-[#b4c392]/5 text-center min-w-[160px] transform hover:scale-105 transition-transform duration-500">
              {isLoading || isFetching ? (
                <div className="h-10 w-16 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse mx-auto mb-1" />
              ) : (
                <div className="text-4xl font-black text-[#b4c392] mb-1">
                  {counts.myPrayers}
                </div>
              )}
              <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                In Progress
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tabs Navigation ── */}
      <div className="flex flex-wrap gap-3">
        {isLoading || isFetching
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 w-[160px] rounded-2xl bg-zinc-100 dark:bg-zinc-800 animate-pulse border border-zinc-200/50 dark:border-zinc-700/50"
              />
            ))
          : tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold tracking-tight transition-all duration-300 ${
                  currentTab === tab.id
                    ? 'bg-[#b4c392]/10 text-[#b4c392] ring-2 ring-[#b4c392] shadow-xl shadow-[#b4c392]/10 scale-105'
                    : 'bg-white dark:bg-zinc-900 text-zinc-400 border border-zinc-100 dark:border-zinc-800 hover:border-[#b4c392]/30'
                }`}
              >
                <tab.icon
                  className={`h-4 w-4 ${currentTab === tab.id ? 'scale-110' : ''}`}
                />
                {tab.label}
              </button>
            ))}
      </div>

      {/* ── Prayer List ── */}
      <div className="space-y-6">
        {isLoading || isFetching ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="h-10 w-10 text-[#b4c392] animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Syncing with Heavens...
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {prayers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {prayers.map((prayer: any) => (
                  <PrayerPrayerCardWrapper
                    key={prayer.id}
                    prayer={prayer}
                    tab={currentTab}
                    onStart={(id) => startMutation.mutate(id)}
                    onComplete={(id, note) =>
                      completeMutation.mutate({ id, note })
                    }
                    isActionLoading={
                      startMutation.isPending || completeMutation.isPending
                    }
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-32 text-center space-y-6 bg-white dark:bg-zinc-900 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800"
              >
                <div className="h-24 w-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-200">
                  <Sparkles className="h-12 w-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-100">
                    All clear for now
                  </h3>
                  <p className="text-zinc-500 max-w-sm mx-auto font-medium">
                    {currentTab === 'available'
                      ? 'No prayers assigned to you yet. Check back later!'
                      : currentTab === 'my-prayers'
                        ? "You haven't started any assigned prayers yet. Check the 'Assigned' tab!"
                        : "You haven't completed any prayers yet."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// Small wrapper to avoid re-rendering issues with the prayer card state
function PrayerPrayerCardWrapper({
  prayer,
  tab,
  onStart,
  onComplete,
  isActionLoading,
}: {
  prayer: any;
  tab: any;
  onStart: (id: string) => void;
  onComplete: (id: string, note?: string) => void;
  isActionLoading: boolean;
}) {
  return (
    <PrayerCard
      prayer={prayer}
      tab={tab}
      onStart={onStart}
      onComplete={onComplete}
      isLoading={isActionLoading}
    />
  );
}

export default function CarrierDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-[#b4c392] animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

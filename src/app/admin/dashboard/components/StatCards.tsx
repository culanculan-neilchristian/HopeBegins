import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  MessageSquare,
  ShieldCheck,
  Radio,
  TrendingUp,
  Anchor,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminStats } from '@/types/admin';

function SkeletonCard() {
  return (
    <Card className="border-none shadow-2xl shadow-zinc-200/50 dark:shadow-none bg-white dark:bg-zinc-900">
      <CardContent className="p-6 space-y-3">
        <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
        <div className="h-8 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
        <div className="h-2.5 w-16 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
      </CardContent>
    </Card>
  );
}

interface StatCardsProps {
  stats: AdminStats | undefined;
  isLoading: boolean;
}

export function StatCards({ stats, isLoading }: StatCardsProps) {
  const STAT_CONFIG = [
    {
      label: 'Total Users',
      value: isLoading ? '—' : (stats?.total_users?.toLocaleString() ?? '—'),
      icon: Users,
      color: 'text-blue-600',
      trend: 'Registered accounts',
    },
    {
      label: 'Prayer Requests',
      value: isLoading ? '—' : (stats?.total_prayers?.toLocaleString() ?? '—'),
      icon: MessageSquare,
      color: 'text-brand',
      trend: `${stats?.pending_prayers ?? '—'} pending`,
    },
    {
      label: 'Active Carriers',
      value: isLoading ? '—' : (stats?.total_carriers?.toLocaleString() ?? '—'),
      icon: ShieldCheck,
      color: 'text-green-600',
      trend: 'Approved volunteers',
    },
    {
      label: 'Hopecast Plays',
      value: isLoading ? '—' : (stats?.hopecast_plays?.toLocaleString() ?? '—'),
      icon: Radio,
      color: 'text-amber-600',
      trend: 'Total play count',
    },
    {
      label: 'Journey Finished',
      value: isLoading
        ? '—'
        : (stats?.journey_completions?.toLocaleString() ?? '—'),
      icon: Anchor,
      color: 'text-rose-600',
      trend: 'Hopeful Beginning',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {STAT_CONFIG.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <Card className="border-none shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all hover:-translate-y-0.5 bg-white dark:bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tabular-nums">
                {stat.value}
              </div>
              <p className="text-[10px] font-bold mt-1 text-emerald-500 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

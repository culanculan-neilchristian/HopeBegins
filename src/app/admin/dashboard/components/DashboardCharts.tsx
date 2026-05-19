'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { AnalyticsData } from '@/types/admin';

interface DashboardChartsProps {
  analytics?: AnalyticsData;
  isLoading?: boolean;
}

const COLORS = [
  '#6b8f5e',
  '#a4c3b2',
  '#cce3de',
  '#eaf4f4',
  '#f6fff8',
  '#d0e1d4',
];

const PRAYER_CATEGORY_LABELS: Record<string, string> = {
  GENERAL: 'General',
  ANXIETY_FEAR: 'Anxiety & Fear',
  HEALTH: 'Health',
  FINANCE: 'Finance',
  RELATIONSHIP: 'Relationship',
  OTHER: 'Other',
};

export function DashboardCharts({
  analytics,
  isLoading,
}: DashboardChartsProps) {
  if (isLoading || !analytics) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6"
          >
            <CardHeader className="px-0 pt-0 pb-8">
              <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-1.5" />
              <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
            </CardHeader>
            <div className="h-[240px] w-full bg-zinc-50 dark:bg-zinc-800/20 rounded-xl animate-pulse" />
          </Card>
        ))}
      </div>
    );
  }

  const prayersByCategory = analytics.prayers_by_category.map((item) => ({
    name: PRAYER_CATEGORY_LABELS[item.category || ''] || item.category,
    value: item.count,
  }));

  const subscribersTrend = analytics.subscribers_trend.map((item) => ({
    name: item.date,
    subscribers: item.count,
  }));

  const playsByCategory = analytics.plays_by_category.map((item) => ({
    name: item.name,
    plays: item.count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Subscriber Trend ── */}
      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
        <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic tracking-tighter uppercase">
              New Subscribers
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Daily Hope Drop subscription trend.
            </p>
          </div>
          <MoreHorizontal className="h-5 w-5 text-zinc-400" />
        </CardHeader>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={subscribersTrend}>
              <defs>
                <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b8f5e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6b8f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                tickFormatter={(val) => val.split('-').slice(1).join('/')}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: '#888' }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="subscribers"
                stroke="#6b8f5e"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSub)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ── Prayer Categories ── */}
      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
        <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic tracking-tighter uppercase">
              Prayer by Category
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Distribution of prayer requests.
            </p>
          </div>
          <MoreHorizontal className="h-5 w-5 text-zinc-400" />
        </CardHeader>
        <div className="h-[240px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={prayersByCategory}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {prayersByCategory.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 ml-4">
            {prayersByCategory.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-[10px] font-black uppercase text-zinc-500">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── Hopecast Plays by Category ── */}
      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
        <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic tracking-tighter uppercase">
              Plays by Category
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Hopecast engagement by genre.
            </p>
          </div>
          <MoreHorizontal className="h-5 w-5 text-zinc-400" />
        </CardHeader>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={playsByCategory}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: '#888' }}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc', radius: 8 }}
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="plays" fill="#6b8f5e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

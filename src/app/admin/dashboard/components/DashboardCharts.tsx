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
} from 'recharts';

interface DashboardChartsProps {
  data: any[];
  isLoading?: boolean;
}

export function DashboardCharts({ data, isLoading }: DashboardChartsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
          <CardHeader className="px-0 pt-0 pb-8">
            <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-1.5" />
            <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
          </CardHeader>
          <div className="h-[240px] w-full bg-zinc-50 dark:bg-zinc-800/20 rounded-xl animate-pulse" />
        </Card>
        <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
          <CardHeader className="px-0 pt-0 pb-8">
            <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-1.5" />
            <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800/50 rounded animate-pulse" />
          </CardHeader>
          <div className="h-[240px] w-full bg-zinc-50 dark:bg-zinc-800/20 rounded-xl animate-pulse" />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
        <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic">
              Prayer Engagement
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Weekly prayer submission trend.
            </p>
          </div>
          <MoreHorizontal className="h-5 w-5 text-zinc-400" />
        </CardHeader>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrayers" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--brand)"
                    stopOpacity={0.25}
                  />
                  <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
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
                tick={{ fontSize: 12, fontWeight: 700, fill: '#888' }}
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
                dataKey="prayers"
                stroke="var(--brand)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrayers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 p-6">
        <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black italic">
              Hopecast Plays
            </CardTitle>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              Weekly play count across all casts.
            </p>
          </div>
          <MoreHorizontal className="h-5 w-5 text-zinc-400" />
        </CardHeader>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: '#888' }}
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

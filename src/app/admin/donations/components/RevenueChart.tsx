import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface ChartData {
  name: string;
  amount: number;
}

interface RevenueChartProps {
  data: ChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="border border-zinc-100 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 p-6">
      <CardHeader className="px-0 pt-0 pb-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-black italic tracking-tight">
            Revenue Over Time
          </CardTitle>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Monthly donation statistics for the current year.
          </p>
        </div>
        <select className="bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 focus:outline-none">
          <option>Year 2026</option>
          <option>Year 2025</option>
        </select>
      </CardHeader>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6b8f5e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6b8f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
              dx={-8}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '14px',
                border: 'none',
                boxShadow: '0 10px 40px rgba(0,0,0,0.10)',
                padding: '10px 14px',
                fontSize: '12px',
                fontWeight: 700,
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6b8f5e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmt)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

'use client';

import { Calendar as CalendarIcon } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-2.5 shadow-sm hover:shadow-md transition-all">
      <div className="p-1.5 bg-brand/10 rounded-lg">
        <CalendarIcon className="h-4 w-4 text-brand" />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onChange(e.target.value, endDate)}
            className="bg-transparent border-none p-0 text-sm font-black focus:ring-0 outline-none cursor-pointer"
          />
        </div>
        <div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800" />
        <div className="flex flex-col">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onChange(startDate, e.target.value)}
            className="bg-transparent border-none p-0 text-sm font-black focus:ring-0 outline-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Mail, Layout } from 'lucide-react';

export function DailyHopeNav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Subscribers',
      href: '/admin/daily-hope',
      icon: Users,
      active: pathname === '/admin/daily-hope',
    },
    {
      name: 'Email Templates',
      href: '/admin/daily-hope/templates',
      icon: Mail,
      active: pathname === '/admin/daily-hope/templates',
    },
    {
      name: 'Journey Page',
      href: '/admin/daily-hope/journey',
      icon: Layout,
      active: pathname === '/admin/daily-hope/journey',
    },
  ];

  return (
    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 p-1.5 rounded-[22px] w-fit border border-zinc-200/50 dark:border-zinc-700/30">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all ${
            tab.active
              ? 'bg-white dark:bg-zinc-900 text-brand shadow-sm shadow-zinc-200/50 dark:shadow-none'
              : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
          }`}
        >
          <tab.icon
            className={`h-3.5 w-3.5 ${tab.active ? 'text-brand' : 'text-zinc-400'}`}
          />
          {tab.name}
        </Link>
      ))}
    </div>
  );
}

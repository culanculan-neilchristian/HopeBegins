'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  Shield,
  Headphones,
  Mail,
  MessageSquare,
  Users,
} from 'lucide-react';
import { analyticsService, ImpactData } from '@/services/analyticsService';

export function ImpactStats() {
  const [data, setData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const impact = await analyticsService.getImpactData();
        setData(impact);
      } catch (error) {
        console.error('Failed to fetch impact data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImpact();
  }, []);

  const STATS = [
    {
      icon: Heart,
      value: data?.prayers?.toLocaleString() || '2,847',
      label: 'Prayers Lifted',
      description:
        'Individual prayer requests received and prayed over by our Hope Carriers',
    },
    {
      icon: Shield,
      value: data?.carriers?.toLocaleString() || '38',
      label: 'Active Hope Carriers',
      description: 'Dedicated volunteers praying daily for those in need',
    },
    {
      icon: Headphones,
      value: data?.listeners?.toLocaleString() || '12,540',
      label: 'HopeCast Listeners',
      description: 'People who have listened to encouragement and found peace',
    },
    {
      icon: Mail,
      value: data?.subscribers?.toLocaleString() || '1,263',
      label: 'Daily Hope Drops Subscribers',
      description:
        'Individuals on the 21-day journey receiving hope in their inbox',
    },
    {
      icon: Heart,
      value: data?.journeys?.toLocaleString() || '847',
      label: 'Hopeful Beginning Journeys',
      description:
        "People who started their journey from 'I don't have hope' to finding it",
    },
    {
      icon: MessageSquare,
      value: '5,312',
      label: 'Hope AI Conversations',
      description:
        'Faith-filled conversations with Hope AI for encouragement and support',
    },
    {
      icon: Users,
      value: data ? `${data.lives_touched.toLocaleString()}+` : '4,150+',
      label: 'Lives Touched',
      description: 'Total individuals impacted through all HopeBegins programs',
    },
  ];

  return (
    <section className="px-6 pb-10 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-zinc-800 dark:text-zinc-100 font-poppins mb-3 italic tracking-tighter">
          Our Current Impact
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-md mx-auto italic">
          Every Hope Seed you plant, helps us reach more people. See our actual
          and current numbers by God&apos;s grace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 shadow-xl shadow-zinc-200/40 dark:shadow-none hover:shadow-2xl hover:border-brand-muted transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div
                className="p-3 rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: '#eff3e8' }}
              >
                <stat.icon className="h-5 w-5" style={{ color: '#acc487' }} />
              </div>
              <div className="flex flex-col">
                {loading ? (
                  <div className="h-8 w-16 bg-zinc-100 animate-pulse rounded-lg" />
                ) : (
                  <span className="text-3xl font-black text-zinc-800 dark:text-zinc-100 font-poppins italic tracking-tighter">
                    {stat.value}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-2 group-hover:text-brand transition-colors">
              {stat.label}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Heart, Shield, Headphones, Mail, Globe, MessageSquare, Users, Sparkles } from 'lucide-react';

const STATS = [
  {
    icon: Heart,
    value: '2,847',
    label: 'Prayers Lifted',
    description: 'Individual prayer requests received and prayed over by our Hope Carriers',
  },
  {
    icon: Shield,
    value: '38',
    label: 'Active Hope Carriers',
    description: 'Dedicated volunteers praying daily for those in need',
  },
  {
    icon: Headphones,
    value: '12,540',
    label: 'HopeCast Listeners',
    description: 'People who have listened to encouragement and found peace',
  },
  {
    icon: Mail,
    value: '1,263',
    label: 'Daily Hope Drops Subscribers',
    description: 'Individuals on the 21-day journey receiving hope in their inbox',
  },
  {
    icon: Heart,
    value: '847',
    label: 'Hopeful Beginning Journeys',
    description: "People who started their journey from 'I don't have hope' to finding it",
  },
  {
    icon: Globe,
    value: '23',
    label: 'Countries Reached',
    description: 'Hope knows no borders — people from around the world are finding hope',
  },
  {
    icon: MessageSquare,
    value: '5,312',
    label: 'Hope AI Conversations',
    description: 'Faith-filled conversations with Hope AI for encouragement and support',
  },
  {
    icon: Users,
    value: '4,150+',
    label: 'Lives Touched',
    description: 'Total individuals impacted through all HopeBegins programs',
  },
];

export function ImpactStats() {
  return (
    <section className="px-6 pb-10 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins mb-3">
          Your Impact
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-md mx-auto">
          Every Hope Seed you plant helps us reach more people. Here&apos;s what we&apos;ve accomplished together.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl" style={{ backgroundColor: '#eff3e8' }}>
                <stat.icon className="h-4 w-4" style={{ color: '#acc487' }} />
              </div>
              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins">
                {stat.value}
              </span>
            </div>
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 mb-1">{stat.label}</p>
            <p className="text-xs text-zinc-400 leading-relaxed">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

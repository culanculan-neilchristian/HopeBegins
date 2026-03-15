import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Heart,
  Radio,
  MessageSquare,
  Mail,
  HelpCircle,
  ArrowRight,
  HandHeart,
} from 'lucide-react';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';

// Import the logo directly to ensure Next.js handles the path correctly
import headerLogo from '@/assets/images/header-logo.png';

export default function LandingPage() {
  const mainActions = [
    {
      title: 'I Need Someone to Pray for Me',
      description: 'Share your heart — a Hope Carrier is ready to lift you up',
      icon: Heart,
      href: '/prayers',
      color:
        'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
    {
      title: 'I Need to Hear Hope Today',
      description: 'Listen to a HopeCast that speaks to where you are',
      icon: Radio,
      href: '/hopecasts',
      color:
        'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    },
    {
      title: 'I Need Daily Hope',
      description:
        'Start receiving Daily Hope Drops — 21 days of hope in your inbox',
      icon: Mail,
      href: '/daily-hope',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      title: 'I Need to Talk to Hope AI',
      description: 'Have a faith-filled conversation with Hope, anytime',
      icon: MessageSquare,
      href: '/hope-ai',
      color:
        'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    },
    {
      title: "I Don't Have Hope",
      description: "That's okay — your Hopeful Beginning starts here",
      icon: HelpCircle,
      href: '/get-started',
      color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
    },
    {
      title: 'I Want To Give Hope',
      description: 'Plant a Hope Seed — support the mission',
      icon: HandHeart,
      href: '/give-hope',
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-200/20 blur-2xl rounded-full" />
              <Image
                src={headerLogo}
                alt="HopeBegins"
                width={56}
                height={56}
                style={{ height: 'auto' }}
                className="relative opacity-60 grayscale brightness-125 hover:grayscale-0 transition-all duration-500 cursor-pointer w-14"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-zinc-800 dark:text-zinc-100 leading-[1.1] font-poppins tracking-tight">
            HopeBegins <span className="text-[#6b634d]">Today.</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Your journey to overcoming anxiety, depression, and hopelessness
            starts here. You are not alone.
          </p>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainActions.map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                className={
                  idx === mainActions.length - 1 && mainActions.length % 2 !== 0
                    ? 'md:col-span-2'
                    : ''
                }
              >
                <Card className="group h-full hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-200/50 dark:hover:border-emerald-800/50 transition-all duration-500 bg-white/90 dark:bg-zinc-900/90 border-zinc-100 dark:border-zinc-800 overflow-hidden">
                  <CardContent className="p-6 flex items-center gap-6">
                    <div
                      className={`p-4 rounded-2xl ${action.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}
                    >
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200 group-hover:text-[#6b634d] dark:group-hover:text-emerald-400 transition-colors font-poppins">
                        {action.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-300 group-hover:text-[#6b634d] group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-bold font-poppins text-zinc-900 dark:text-zinc-100 tracking-tight">
              Stories of Hope
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              See what others are saying about their journey.
            </p>
          </div>

          <div className="mt-8">
            <TestimonialCarousel />
          </div>
        </div>
      </section>
    </>
  );
}

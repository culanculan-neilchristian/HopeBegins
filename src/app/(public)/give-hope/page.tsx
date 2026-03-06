'use client';

import { ImpactStats } from './components/ImpactStats';
import { TestimonialCard } from './components/TestimonialCard';
import { AllocationBreakdown } from './components/AllocationBreakdown';
import { DonationForm } from './components/DonationForm';

export default function GiveHopePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 -z-10" />
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins tracking-tight">
              Give Hope
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Plant a Hope Seed — support the mission.
            </p>
          </div>
        </section>

        {/* ── Impact Stats ── */}
        <ImpactStats />

        {/* ── Testimonial ── */}
        <TestimonialCard />

        {/* ── Allocation ── */}
        <AllocationBreakdown />

        {/* ── Donation Form ── */}
        <DonationForm />
      </main>
    </div>
  );
}

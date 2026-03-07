'use client';

import { DailyHopeForm } from './components/DailyHopeForm';
import { motion } from 'framer-motion';

export default function DailyHopePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative pt-20 pb-16 px-6 overflow-hidden">
          {/* Decorative background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-muted/50 to-transparent dark:from-brand-muted/20 -z-10" />

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins tracking-tight">
              I Need Daily Hope
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              For the next 21 days, you&apos;ll receive a Daily Hope Drop to
              remind you that hope is real.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DailyHopeForm />
          </motion.div>
        </section>
      </main>
    </div>
  );
}

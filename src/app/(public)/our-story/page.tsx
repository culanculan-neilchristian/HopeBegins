'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { StorySection } from './components/StorySection';

const STORY_SECTIONS = [
  {
    title: 'Our Mission',
    content:
      'HopeBegins exists to provide faith-driven mental health support to individuals experiencing anxiety, depression, and hopelessness. We believe everyone deserves hope.',
  },
  {
    title: 'Our Vision',
    content:
      'A world where no one faces their darkest moments alone — where hope is always within reach, and faith meets you right where you are.',
  },
  {
    title: 'How It Started',
    content:
      'HopeBegins was born from a simple conviction: that faith and compassion can transform lives. What started as a small prayer initiative has grown into a global platform.',
  },
  {
    title: 'The H.O.P.E. Framework',
    content:
      'Heal from the past, Overcome present challenges, find Purpose in your story, and Embrace a hopeful future.',
  },
];

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative pt-20 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 -z-10" />
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins tracking-tight">
              Our Story
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              How HopeBegins began and why it matters.
            </p>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="px-6 pb-16 max-w-2xl mx-auto space-y-6">
          {STORY_SECTIONS.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <StorySection title={section.title}>
                {section.content}
              </StorySection>
            </motion.div>
          ))}
        </section>

        {/* ── Back to Home ── */}
        <div className="flex justify-center pb-24 px-6">
          <Link href="/">
            <Button className="bg-[#b4c392] hover:bg-[#a3b281] text-white font-bold font-poppins uppercase tracking-widest text-xs h-12 px-10 rounded-full shadow-sm transition-all duration-200">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

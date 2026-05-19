'use client';

import Link from 'next/link';
import { CheckCircle2, ArrowRight, Share2, Mail, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex justify-center"
        >
          <div className="h-24 w-24 rounded-[32px] bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-2xl">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-black italic tracking-tighter text-zinc-800 dark:text-zinc-100 font-poppins">
            Hope Seed Planted!
          </h1>
          <p className="text-zinc-500 font-medium leading-relaxed">
            Thank you for your generous support. Your contribution helps us
            spread hope to those who need it most.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-zinc-100 dark:border-zinc-800 shadow-xl rounded-[32px] overflow-hidden bg-white dark:bg-zinc-900">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4 text-left">
                <div className="h-10 w-10 rounded-xl bg-[#a3b281]/10 flex items-center justify-center text-[#a3b281]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Receipt Sent
                  </p>
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Check your email for details.
                  </p>
                </div>
              </div>

              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Share the Hope
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl h-12 border-zinc-100 font-bold gap-2"
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button className="w-full rounded-xl h-12 bg-[#a3b281] hover:bg-[#a3b281]/90 font-bold gap-2">
                      <Home className="h-4 w-4" /> Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <Link
            href="/daily-hope"
            className="group inline-flex items-center gap-2 text-[#a3b281] font-black italic tracking-tight hover:underline"
          >
            Start your own Journey of Hope{' '}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

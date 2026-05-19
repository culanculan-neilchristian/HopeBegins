'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  siteSettingsService,
  PopoutItem,
} from '@/services/siteSettingsService';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

const EngagementPopout = () => {
  const pathname = usePathname();
  const [currentItem, setCurrentItem] = useState<PopoutItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ['popout-public'],
    queryFn: () => siteSettingsService.getPublicPopouts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!pathname && !pathname.startsWith('/admin'),
  });

  useEffect(() => {
    // Don't show on admin dashboard
    if (pathname?.startsWith('/admin')) return;

    if (!settings || !settings.is_enabled || settings.items.length === 0)
      return;

    const showRandomPopout = () => {
      const randomIndex = Math.floor(Math.random() * settings.items.length);
      setCurrentItem(settings.items[randomIndex]);
      setIsVisible(true);

      // Hide after 10 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    };

    // Initial delay before first popout
    const initialDelay = setTimeout(showRandomPopout, 5000);

    const interval = setInterval(
      showRandomPopout,
      settings.interval_seconds * 1000
    );

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, [settings]);

  if (pathname?.startsWith('/admin') || !settings || !settings.is_enabled || !currentItem)
    return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-[9999] max-w-[420px] w-full"
        >
          <div className="bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(244,63,94,0.2)] border border-white/20 dark:border-zinc-800/50 p-5 flex items-center justify-between gap-6 relative overflow-hidden group min-w-[320px] md:min-w-[420px]">
            {/* Animated Background Gradient */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl"
            />

            <div className="flex items-center gap-4 flex-1 relative z-10">
              <div className="p-2.5 bg-rose-500/10 dark:bg-rose-500/20 rounded-2xl">
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-rose-500" />
                </motion.div>
              </div>
              <div className="flex-1">
                <p className="text-zinc-800 dark:text-zinc-100 text-sm font-bold leading-snug tracking-tight">
                  {currentItem.message}
                </p>
              </div>
            </div>

            <Link
              href={currentItem.link}
              className="relative overflow-hidden inline-flex items-center justify-center px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black rounded-2xl transition-all shadow-lg shadow-rose-500/30 active:scale-95 whitespace-nowrap group/btn z-10"
            >
              <span className="relative z-10">{currentItem.button_text}</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Link>

            {/* Time progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 10, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500/50 origin-left"
            />

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EngagementPopout;

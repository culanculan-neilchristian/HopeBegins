'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Heart, CheckCircle2, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Prayer } from '@/types/admin';

interface PrayerCardProps {
  prayer: Prayer;
  tab: 'available' | 'my-prayers' | 'completed';
  onStart?: (id: string) => void;
  onComplete?: (id: string, note?: string) => void;
  isLoading?: boolean;
}

export function PrayerCard({
  prayer,
  tab,
  onStart,
  onComplete,
  isLoading,
}: PrayerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState('');

  const getCategoryLabel = (cat: string) => {
    return cat.replace(/_/g, ' & ').toLowerCase();
  };

  return (
    <motion.div
      layout
      className={`group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
        isExpanded
          ? 'border-[#b4c392]/50 shadow-2xl shadow-[#b4c392]/10 ring-1 ring-[#b4c392]/20'
          : 'border-zinc-100 dark:border-zinc-800 hover:border-[#b4c392]/30 hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-none'
      }`}
    >
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <h3 className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-100 group-hover:text-[#b4c392] transition-colors">
                {prayer.isAnonymous || !prayer.shareFirstName
                  ? 'Anonymous'
                  : prayer.title}
              </h3>
              <span className="px-3 py-1 bg-[#b4c392]/10 text-[#b4c392] text-[10px] font-black uppercase tracking-widest rounded-full">
                {getCategoryLabel(prayer.category)}
              </span>
              <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-200" />
                {format(new Date(prayer.created_at), 'MMM d, yyyy')}
              </span>
            </div>

            <p
              className={`text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed ${isExpanded ? '' : 'line-clamp-1'}`}
            >
              {prayer.content}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {tab === 'available' && (
              <span className="text-[10px] font-black uppercase tracking-widest text-[#b4c392] bg-[#b4c392]/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                Assigned
              </span>
            )}
            {tab === 'my-prayers' && (
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f4a460] bg-[#f4a460]/10 px-4 py-1.5 rounded-full whitespace-nowrap">
                Lifting
              </span>
            )}
            <div
              className={`p-2 rounded-xl transition-all ${isExpanded ? 'bg-[#b4c392] text-white rotate-90' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-400'}`}
            >
              {isExpanded ? (
                <X className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'circOut' }}
            className="border-t border-zinc-50 dark:border-zinc-800"
          >
            <div className="p-6 space-y-8 bg-zinc-50/30 dark:bg-zinc-900/30">
              <div className="p-6 bg-[#b4c392]/5 rounded-[2rem] border border-[#b4c392]/10 text-zinc-700 dark:text-zinc-300 font-medium leading-loose italic relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Heart className="h-20 w-20 text-[#b4c392]" />
                </div>
                &ldquo;{prayer.content}&rdquo;
              </div>

              {tab === 'available' && (
                <div className="flex justify-end">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStart?.(prayer.id);
                    }}
                    disabled={isLoading}
                    className="h-14 px-12 bg-[#b4c392] hover:bg-[#a3b281] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#b4c392]/20 transition-all active:scale-95 flex items-center gap-3"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Start Praying for{' '}
                    {prayer.isAnonymous ? 'Anonymous' : prayer.title}
                  </Button>
                </div>
              )}

              {tab === 'my-prayers' && (
                <div className="space-y-6">
                  {prayer.wantsFollowUp && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                        Write an encouraging note (optional)
                      </label>
                      <Textarea
                        placeholder="Share a word of encouragement..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[120px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-[#b4c392]/20 focus:border-[#b4c392] font-medium p-6"
                      />
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onComplete?.(prayer.id, note);
                      }}
                      disabled={isLoading}
                      className="h-14 px-12 bg-[#b4c392] hover:bg-[#a3b281] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#b4c392]/20 transition-all active:scale-95 flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Prayed
                    </Button>
                  </div>
                </div>
              )}

              {tab === 'completed' && prayer.responses?.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">
                    Your Response
                  </p>
                  {prayer.responses.map((resp: any) => (
                    <div
                      key={resp.id}
                      className="p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800 font-medium text-zinc-600 dark:text-zinc-400 italic"
                    >
                      {resp.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

'use client';

import { useDailyHopeForm } from '../hooks/useDailyHopeForm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Calendar, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const DAYS_PREVIEW = [
  { day: 1, title: 'The Seed of Hope', icon: <Sparkles className="h-4 w-4" /> },
  { day: 2, title: 'Roots of Faith', icon: <Target className="h-4 w-4" /> },
  {
    day: 3,
    title: 'Light in Darkness',
    icon: <Calendar className="h-4 w-4" />,
  },
];

export function DailyHopeForm() {
  const { form, onSubmit, isSubmitting } = useDailyHopeForm();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Journey Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DAYS_PREVIEW.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center space-y-2 group hover:border-brand/30 transition-all cursor-default"
          >
            <div className="h-8 w-8 rounded-full bg-brand-muted flex items-center justify-center text-brand">
              {item.icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Day {item.day}
              </span>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-poppins">
                        First Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your first name"
                          className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12 rounded-xl focus:ring-brand focus:border-brand"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-poppins">
                        Last Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your last name"
                          className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12 rounded-xl focus:ring-brand focus:border-brand"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-poppins">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12 rounded-xl focus:ring-brand focus:border-brand"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-[#b4c392] hover:bg-[#a3b281] text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg transition-all duration-300 transform active:scale-[0.98]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Start My Hope Journey'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-zinc-400 font-medium italic">
        Join 1,000+ others already receiving daily encouragement.
      </p>
    </div>
  );
}

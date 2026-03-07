'use client';

import { useCarrierAuth } from '@/hooks/useCarrierAuth';
import Link from 'next/link';
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Loader2, ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';

export function CarrierLoginForm() {
  const { form, onSubmit, isSubmitting, error } = useCarrierAuth();

  return (
    <Card className="w-full max-w-md border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
      <CardHeader className="space-y-1 text-center pb-8 pt-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-[2rem] bg-[#b4c392]/10 text-[#b4c392] ring-8 ring-[#b4c392]/5 transform -rotate-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
          Carrier Login
        </CardTitle>
        <CardDescription className="text-zinc-500 font-medium px-6">
          Welcome back! Access your hub to continue standing in the gap for
          others.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-tight">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                    Email Identity
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#b4c392] transition-colors" />
                      <Input
                        placeholder="your@email.com"
                        className="pl-11 h-14 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:border-[#b4c392] focus:ring-[#b4c392]/20 transition-all rounded-2xl font-medium"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold text-rose-500 ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between ml-1 mb-1">
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      Security Key
                    </FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[10px] font-black uppercase tracking-widest text-[#b4c392] hover:text-[#a3b281] transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#b4c392] transition-colors" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 h-14 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:border-[#b4c392] focus:ring-[#b4c392]/20 transition-all rounded-2xl font-medium"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold text-rose-500 ml-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-14 bg-[#b4c392] hover:bg-[#a3b281] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#b4c392]/20 transition-all duration-500 mt-4 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-3 group-hover:scale-105 transition-transform">
                  Enter Command Hub
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

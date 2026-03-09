'use client';

import { useState } from 'react';

import { useAdminLogin } from '../hooks/useAdminLogin';
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
import { Loader2, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function AdminLoginForm() {
  const { form, onSubmit, isSubmitting, error } = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-md border-zinc-100 dark:border-zinc-800 shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-2xl bg-brand-muted text-brand ring-4 ring-brand-muted/20">
            <Lock className="w-6 h-6" />
          </div>
        </div>
        <CardTitle className="text-2xl font-black italic tracking-tighter text-brand font-poppins uppercase">
          The Desk Login
        </CardTitle>
        <CardDescription className="text-zinc-500 font-dm-sans font-medium">
          Enter your admin credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>
              {error instanceof Error
                ? error.message
                : 'Invalid credentials. Please try again.'}
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-brand transition-colors" />
                      <Input
                        placeholder="Enter your email address"
                        className="pl-11 h-12 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:border-brand focus:ring-brand/20 transition-all rounded-xl"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-brand transition-colors" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="pl-11 pr-11 h-12 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus:border-brand focus:ring-brand/20 transition-all rounded-xl"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs ml-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-brand hover:bg-brand-hover text-brand-foreground font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-brand/10 transition-all duration-300 mt-4 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Access Dashboard
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

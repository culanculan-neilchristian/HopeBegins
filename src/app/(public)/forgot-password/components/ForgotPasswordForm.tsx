'use client';

import { Loader2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
import { useForgotPassword } from '../hooks/useForgotPassword';

export function ForgotPasswordForm() {
  const { form, onSubmit, isSubmitting, isSent, setIsSent } =
    useForgotPassword();

  return (
    <Card className="w-full max-w-md border-zinc-100 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-none bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
      <CardHeader className="space-y-1 text-center pb-8 pt-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-[2rem] bg-[#b4c392]/10 text-[#b4c392] ring-8 ring-[#b4c392]/5 transform rotate-6">
            {isSent ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <Mail className="w-8 h-8" />
            )}
          </div>
        </div>
        <CardTitle className="text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
          {isSent ? 'Check Your Email' : 'Forgot Password'}
        </CardTitle>
        <CardDescription className="text-zinc-500 font-medium px-6">
          {isSent
            ? "We've sent a recovery link to your inbox. Please check your email to continue."
            : "No worries! Enter the email associated with your account and we'll send you a link to reset your password."}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        {!isSent ? (
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">
                      Email Address
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

              <Button
                type="submit"
                className="w-full h-14 bg-[#b4c392] hover:bg-[#a3b281] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#b4c392]/20 transition-all duration-500 mt-4 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-3 group-hover:scale-105 transition-transform">
                    Send Recovery Link
                  </span>
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-sm text-zinc-500 font-medium italic">
              Didn&apos;t receive the email? Check your spam folder or try
              again.
            </p>
            <Button
              onClick={() => setIsSent(false)}
              variant="ghost"
              className="w-full h-14 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all"
            >
              Try Different Email
            </Button>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/login/carrier"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#b4c392] hover:text-[#a3b281] transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

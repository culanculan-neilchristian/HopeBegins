'use client';

import { useCarrierForm } from '../hooks/useCarrierForm';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function CarrierForm() {
  const { form, onSubmit, isSubmitting } = useCarrierForm();

  return (
    <Card className="max-w-xl mx-auto border-zinc-100 dark:border-zinc-800 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    First Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Last Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Phone (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="church_community"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Church / Community (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your church or community"
                      className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carrier_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Why do you want to be a Hope Carrier? *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your heart..."
                      className="min-h-[150px] bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3 pt-2">
              <FormField
                control={form.control}
                name="agreed_to_guidelines"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-3">
                      <FormControl>
                        <input
                          type="checkbox"
                          id="agreedToGuidelines"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-zinc-300 text-[#6b634d] focus:ring-[#6b634d]"
                        />
                      </FormControl>
                      <label
                        htmlFor="agreedToGuidelines"
                        className="text-sm text-zinc-500 font-medium cursor-pointer"
                      >
                        I agree to the Hope Carrier guidelines and code of
                        conduct
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#b4c392] hover:bg-[#a3b281] text-white font-bold text-sm rounded-lg shadow-sm transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Become a Hope Carrier'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

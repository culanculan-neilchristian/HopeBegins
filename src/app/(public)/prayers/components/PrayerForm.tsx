'use client';

import { usePrayerForm } from '../hooks/usePrayerForm';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function PrayerForm() {
  const { form, onSubmit, isSubmitting } = usePrayerForm();

  return (
    <Card className="max-w-xl mx-auto border-zinc-100 dark:border-zinc-800 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    First Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your first name"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Prayer Category *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 h-12">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GENERAL">General</SelectItem>
                      <SelectItem value="ANXIETY_FEAR">
                        Anxiety & Fear
                      </SelectItem>
                      <SelectItem value="HEALTH">Health</SelectItem>
                      <SelectItem value="FINANCE">Finance</SelectItem>
                      <SelectItem value="RELATIONSHIP">Relationship</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Prayer Concern *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share as much or as little as you'd like..."
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
                name="shareFirstName"
                render={({ field }) => (
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="shareFirstName"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-zinc-300 text-[#6b634d] focus:ring-[#6b634d]"
                    />
                    <label
                      htmlFor="shareFirstName"
                      className="text-sm text-zinc-500 font-medium cursor-pointer"
                    >
                      Share my first name with the Hope Carrier
                    </label>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="wantsFollowUp"
                render={({ field }) => (
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="wantsFollowUp"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-zinc-300 text-[#6b634d] focus:ring-[#6b634d]"
                    />
                    <label
                      htmlFor="wantsFollowUp"
                      className="text-sm text-zinc-500 font-medium cursor-pointer"
                    >
                      I&apos;d like a follow-up encouraging message
                    </label>
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      tabIndex={-1}
                      autoComplete="off"
                      placeholder="Your website"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-[#b4c392] hover:bg-[#a3b281] text-white font-bold text-sm rounded-lg shadow-sm transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Submit My Prayer'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { Organization, OrganizationPayload } from '@/types/admin';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().optional(),
  is_active: z.boolean().optional(),
});

interface Props {
  initial?: Organization | null;
  onSave: (payload: OrganizationPayload) => void;
  onClose: () => void;
  isPending: boolean;
}

export function OrganizationModal({
  initial,
  onSave,
  onClose,
  isPending,
}: Props) {
  const form = useForm<OrganizationPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name || '',
      description: initial?.description || '',
      is_active: initial?.is_active ?? true,
    },
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic tracking-tight">
            {initial ? 'Edit Organization' : 'New Organization'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Organization Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Hope Community Church"
                      className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none shadow-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe this organization..."
                      className="min-h-[100px] rounded-xl bg-zinc-50 dark:bg-zinc-900 border-none shadow-sm resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-900 p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold">
                      Active Status
                    </FormLabel>
                    <p className="text-xs text-zinc-500 font-medium">
                      Inactive organizations won&apos;t show in the public
                      dropdown.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="h-12 px-6 rounded-xl font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 px-8 rounded-xl bg-brand text-brand-foreground font-black uppercase tracking-widest shadow-lg shadow-brand/20"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : initial ? (
                  'Save Changes'
                ) : (
                  'Create Organization'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

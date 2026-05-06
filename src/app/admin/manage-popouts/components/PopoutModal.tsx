import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PopoutItem } from '@/services/siteSettingsService';

const schema = z.object({
  message: z.string().min(1, 'Message is required').max(255),
  button_text: z.string().min(1, 'Button text is required').max(50),
  link: z.string().min(1, 'Link is required'),
  is_active: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initial?: PopoutItem | null;
  onSave: (data: FormData) => void;
  onClose: () => void;
  isPending: boolean;
}

export function PopoutModal({ initial, onSave, onClose, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial || {
      message: '',
      button_text: '',
      link: '',
      is_active: true,
    },
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-black italic tracking-tight">
            {initial ? 'Edit Pop-out' : 'New Pop-out'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSave)} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Message
            </label>
            <Input
              {...register('message')}
              placeholder="e.g., Someone just gave hope"
              className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-brand shadow-sm"
            />
            {errors.message && (
              <p className="text-xs font-bold text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Button Text
            </label>
            <Input
              {...register('button_text')}
              placeholder="e.g., JOIN"
              className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-brand shadow-sm"
            />
            {errors.button_text && (
              <p className="text-xs font-bold text-red-500">
                {errors.button_text.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Link
            </label>
            <Input
              {...register('link')}
              placeholder="e.g., /be-carrier"
              className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-brand shadow-sm"
            />
            {errors.link && (
              <p className="text-xs font-bold text-red-500">
                {errors.link.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="is_active"
              {...register('is_active')}
              className="h-5 w-5 rounded border-zinc-300 text-brand focus:ring-brand"
            />
            <label htmlFor="is_active" className="text-sm font-bold">
              Active
            </label>
          </div>

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl font-bold"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              className="flex-1 h-12 rounded-xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : initial ? (
                'Update'
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

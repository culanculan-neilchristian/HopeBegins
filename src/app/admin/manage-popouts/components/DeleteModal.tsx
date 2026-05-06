import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PopoutItem } from '@/services/siteSettingsService';

interface Props {
  item: PopoutItem;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteModal({ item, onConfirm, onCancel, isPending }: Props) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 flex flex-col items-center text-center gap-6">
          <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight">Delete Pop-out?</h2>
            <p className="text-zinc-500 font-medium">
              Are you sure you want to delete <span className="font-bold text-zinc-900 dark:text-zinc-100">"{item.message}"</span>? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1 h-12 rounded-xl font-bold"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              onClick={onConfirm}
              className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest"
            >
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

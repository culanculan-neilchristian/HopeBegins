'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Organization } from '@/types/admin';

interface Props {
  org: Organization;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteModal({ org, onConfirm, onCancel, isPending }: Props) {
  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight">
            Delete Organization?
          </DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium mt-2">
            Are you sure you want to delete{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">
              &quot;{org.name}&quot;
            </span>
            ? This action cannot be undone and may affect prayers linked to it.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex-1 h-12 rounded-xl font-bold"
          >
            No, Keep it
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            variant="destructive"
            className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-500/20"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Yes, Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

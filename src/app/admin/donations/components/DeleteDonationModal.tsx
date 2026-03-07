'use client';

import { Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Donation } from '@/types/admin';

interface DeleteDonationModalProps {
  donation: Donation;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteDonationModal({
  donation,
  onConfirm,
  onCancel,
  isPending,
}: DeleteDonationModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Confirm Deletion"
      description="Caution: This will permanently remove this donation record from the database."
      icon={<Trash2 className="h-6 w-6 text-red-500" />}
      iconClassName="bg-red-50 dark:bg-red-900/20"
    >
      <div className="space-y-6">
        <div className="p-4 bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20 flex gap-4">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Are you sure you want to delete the record of{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-bold tabular-nums">
              ${donation.amount}
            </span>{' '}
            from{' '}
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">
              {donation.name}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-800"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 h-12 rounded-2xl font-bold bg-red-500 hover:bg-red-600 transition-colors"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Permanently Delete'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

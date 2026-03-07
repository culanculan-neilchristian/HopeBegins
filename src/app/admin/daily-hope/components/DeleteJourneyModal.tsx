'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Loader2, AlertTriangle } from 'lucide-react';
import type { HopeJourney } from '@/types/admin';

interface DeleteJourneyModalProps {
  journey: HopeJourney;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteJourneyModal({
  journey,
  onConfirm,
  onCancel,
  isPending,
}: DeleteJourneyModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Unsubscribe from Daily Hope?"
      description={`You're about to delete "${journey.first_name} ${journey.last_name}" (${journey.email}) from the Daily Hope journey. They will stop receiving automated messages.`}
      icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
      iconClassName="bg-red-50 dark:bg-red-900/20"
    >
      <div className="flex gap-3 mt-2">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1 h-11 rounded-xl font-bold border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isPending}
          className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-sm"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Confirm Delete'
          )}
        </Button>
      </div>
    </Modal>
  );
}

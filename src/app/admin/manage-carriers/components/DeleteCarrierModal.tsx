import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Trash2, Loader2 } from 'lucide-react';
import type { HopeCarrier } from '@/types/admin';

interface DeleteCarrierModalProps {
  carrier: HopeCarrier;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteCarrierModal({
  carrier,
  onConfirm,
  onCancel,
  isPending,
}: DeleteCarrierModalProps) {
  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Delete Carrier?"
      description={`You're about to delete "${carrier.first_name} ${carrier.last_name}". This action cannot be undone.`}
      icon={<Trash2 className="h-6 w-6 text-red-600" />}
      iconClassName="bg-red-50 dark:bg-red-900/20"
    >
      <div className="flex gap-3">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-700"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isPending}
          className="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}

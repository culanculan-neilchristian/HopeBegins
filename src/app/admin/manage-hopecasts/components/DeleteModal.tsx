import { Button } from '@/components/ui/button';
import { X, Trash2, Loader2 } from 'lucide-react';
import type { Hopecast } from '@/types/admin';

interface DeleteModalProps {
  hopecast: Hopecast;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteModal({
  hopecast,
  onConfirm,
  onCancel,
  isPending,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-black/20">
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="h-4 w-4 text-zinc-500" />
        </button>

        <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight mb-2">
          Delete Hopecast?
        </h2>
        <p className="text-zinc-500 font-medium mb-1">
          You&apos;re about to delete:
        </p>
        <p className="text-zinc-900 dark:text-zinc-100 font-bold mb-4">
          &ldquo;{hopecast.title}&rdquo;
        </p>
        <p className="text-sm text-zinc-400 mb-8">
          This action cannot be undone.
        </p>

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
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

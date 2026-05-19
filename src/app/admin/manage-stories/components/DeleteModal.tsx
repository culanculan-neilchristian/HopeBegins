'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { HopeStory } from '@/services/hopeStoryService';
import { AlertCircle } from 'lucide-react';

interface DeleteModalProps {
  story: HopeStory;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function DeleteModal({
  story,
  onConfirm,
  onCancel,
  isPending,
}: DeleteModalProps) {
  return (
    <Modal
      isOpen={!!story}
      onClose={onCancel}
      title="Delete Hope Story"
      description="Are you sure you want to delete this story? This action cannot be undone."
      icon={<AlertCircle className="h-6 w-6 text-red-500" />}
      iconClassName="bg-red-50 dark:bg-red-900/20"
    >
      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
          <p className="text-sm font-bold text-zinc-900 dark:text-white">
            {story.full_name}
          </p>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 italic">
            &quot;{story.testimonial}&quot;
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold"
          >
            {isPending ? 'Deleting...' : 'Confirm Delete'}
          </Button>
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            className="w-full h-12 rounded-2xl text-zinc-500 font-medium"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

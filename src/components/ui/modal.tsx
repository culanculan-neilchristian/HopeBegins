'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconClassName?: string;
  className?: string;
  contentClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  icon,
  iconClassName,
  className,
  contentClassName,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          'rounded-3xl p-0 max-w-lg shadow-2xl shadow-black/20 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 max-h-[90vh] overflow-hidden flex flex-col',
          className
        )}
      >
        <div className="overflow-y-auto p-8 flex-1 custom-scrollbar">
          <DialogHeader className="text-left sm:text-left">
            {icon && (
              <div
                className={cn(
                  'flex items-center justify-center h-14 w-14 rounded-2xl bg-brand-muted/50 dark:bg-brand/10 mb-6',
                  iconClassName
                )}
              >
                {icon}
              </div>
            )}
            {title && (
              <DialogTitle className="text-2xl font-black tracking-tight mb-1">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-zinc-400 font-medium text-sm mb-4">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className={cn('mt-2', contentClassName)}>{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

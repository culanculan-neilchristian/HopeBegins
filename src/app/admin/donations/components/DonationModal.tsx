'use client';

import { useState } from 'react';
import {
  TrendingUp,
  User,
  Calendar,
  Layers,
  Check,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Donation, DonationType } from '@/types/admin';

interface DonationModalProps {
  initial?: Donation | null;
  onSave: (payload: Omit<Donation, 'id'>) => void;
  onClose: () => void;
  isPending: boolean;
}

export function DonationModal({
  initial,
  onSave,
  onClose,
  isPending,
}: DonationModalProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [amount, setAmount] = useState(initial?.amount?.toString() ?? '');
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().split('T')[0]
  );
  const [type, setType] = useState<DonationType>(
    initial?.donation_type ?? 'ONE_TIME'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!name.trim() || isNaN(parsedAmount)) return;

    onSave({
      name: name.trim(),
      amount: parsedAmount,
      date,
      donation_type: type,
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={initial ? 'Edit Donation' : 'Record Donation'}
      description={
        initial
          ? 'Update the details for this donation record.'
          : 'Manually enter the details to track a new donation seed.'
      }
      icon={<TrendingUp className="h-6 w-6 text-brand" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donor Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
            Donor Identity
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              required
              placeholder="Full Name or Anonymous"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 font-bold focus-visible:ring-brand/30 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Amount */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
              Seed Amount (₱)
            </label>
            <Input
              required
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 font-black text-lg focus-visible:ring-brand/30 transition-all"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
              Entry Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 font-bold focus-visible:ring-brand/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Type Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
            Frequency Pattern
          </label>
          <div className="flex gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800">
            {(['ONE_TIME', 'MONTHLY'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  type === t
                    ? 'bg-white dark:bg-zinc-700 text-brand shadow-sm border border-zinc-200 dark:border-zinc-600'
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                {t === 'ONE_TIME' ? 'One-Time' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200 dark:border-zinc-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending || !name.trim() || !amount}
            className="flex-1 h-12 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-bold shadow-lg shadow-brand/10 transition-all"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{initial ? 'Save' : 'Commit'}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

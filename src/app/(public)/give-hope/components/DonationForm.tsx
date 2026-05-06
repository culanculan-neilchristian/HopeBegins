'use client';

import { useGiveHope } from '../hooks/useGiveHope';

import {
  Heart,
  RefreshCw,
  CreditCard,
  Building2,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function DonationForm() {
  const {
    selectedAmount,
    setSelectedAmount,
    isCustom,
    setIsCustom,
    donationType,
    setDonationType,
    coversFee,
    setCoversFee,
    name,
    setName,
    email,
    setEmail,
    presetAmounts,
    handleDonate,
    isPending,
  } = useGiveHope();

  // Stripe PH standard fee is roughly 3.5% + 15 PHP
  const fee = coversFee
    ? (selectedAmount + 15) / (1 - 0.035) - selectedAmount
    : 0;
  const total = selectedAmount + fee;

  const onAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
  };

  const onCustomClick = () => {
    setIsCustom(true);
    setSelectedAmount(0);
  };

  return (
    <section className="px-6 pb-16 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] p-6 sm:p-10 shadow-2xl shadow-zinc-200/50 dark:shadow-none space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3b281]/10 text-[#a3b281] text-[10px] font-black uppercase tracking-widest mb-2">
            <Heart className="h-3 w-3" /> Support the Mission
          </div>
          <h2 className="text-3xl font-black italic text-zinc-800 dark:text-zinc-100 font-poppins tracking-tighter">
            Plant a Hope Seed
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Every seed grows into a story of hope.
          </p>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display Name (Optional)"
              className="w-full h-12 px-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 focus:border-[#acc487] outline-none font-bold text-sm transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="For your receipt"
              className="w-full h-12 px-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 focus:border-[#acc487] outline-none font-bold text-sm transition-all"
            />
          </div>
        </div>

        {/* Donation Type Toggle */}
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
          <button
            onClick={() => setDonationType('ONE_TIME')}
            className={cn(
              'flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
              donationType === 'ONE_TIME'
                ? 'bg-white dark:bg-zinc-900 text-[#a3b281] shadow-sm'
                : 'text-zinc-400'
            )}
          >
            Give Once
          </button>
          <button
            onClick={() => setDonationType('MONTHLY')}
            className={cn(
              'flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
              donationType === 'MONTHLY'
                ? 'bg-white dark:bg-zinc-900 text-[#a3b281] shadow-sm'
                : 'text-zinc-400'
            )}
          >
            Monthly Hope
          </button>
        </div>

        {/* Amount Selector */}
        <div className="grid grid-cols-4 gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => onAmountClick(amount)}
              className={cn(
                'h-14 rounded-2xl border-2 text-sm font-black transition-all duration-200',
                !isCustom && selectedAmount === amount
                  ? 'bg-[#a3b281] border-[#a3b281] text-white shadow-lg shadow-[#a3b281]/20'
                  : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-[#a3b281]/30'
              )}
            >
              ₱{amount}
            </button>
          ))}
          <button
            onClick={onCustomClick}
            className={cn(
              'h-14 rounded-2xl border-2 text-sm font-black transition-all duration-200',
              isCustom
                ? 'bg-[#a3b281] border-[#a3b281] text-white shadow-lg shadow-[#a3b281]/20'
                : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-[#a3b281]/30'
            )}
          >
            Custom
          </button>
        </div>

        {/* Custom Amount Input */}
        {isCustom && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                ₱
              </span>
              <input
                type="number"
                value={selectedAmount || ''}
                onChange={(e) =>
                  setSelectedAmount(parseInt(e.target.value) || 0)
                }
                placeholder="Enter amount"
                className="w-full h-14 pl-10 pr-4 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-[#acc487] outline-none font-bold text-zinc-800 dark:text-zinc-100 transition-all text-xl"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Cover Fees Toggle */}
        <button
          onClick={() => setCoversFee(!coversFee)}
          className={cn(
            'w-full p-4 rounded-2xl border transition-all flex items-start gap-4 text-left',
            coversFee
              ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/20'
              : 'bg-zinc-50 dark:bg-zinc-800/20 border-zinc-100 dark:border-zinc-800'
          )}
        >
          <div
            className={cn(
              'mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
              coversFee
                ? 'bg-emerald-500 border-emerald-500'
                : 'border-zinc-300'
            )}
          >
            {coversFee && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
          </div>
          <div className="flex-1">
            <p
              className={cn(
                'text-xs font-black uppercase tracking-widest',
                coversFee
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-zinc-500'
              )}
            >
              Cover transaction fees
            </p>
            <p className="text-[10px] text-zinc-400 font-medium mt-1">
              Add ₱{fee.toFixed(2)} to your donation so 100% of your ₱
              {selectedAmount} goes to the mission.
            </p>
          </div>
        </button>

        {/* Submit Button */}
        <div className="space-y-4 pt-4">
          <button
            onClick={handleDonate}
            disabled={selectedAmount <= 0 || isPending}
            className="w-full h-16 rounded-[22px] font-black text-white text-base shadow-xl shadow-[#a3b281]/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            style={{ backgroundColor: '#a3b281' }}
          >
            {isPending ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <CreditCard className="h-5 w-5" />
            )}
            {isPending ? 'Processing...' : `Donate ₱${total.toFixed(2)}`}
          </button>

          <p className="text-[10px] text-zinc-400 font-medium text-center flex items-center justify-center gap-1.5 italic">
            <Info className="h-3 w-3" /> Secure payment processed by Stripe.
          </p>
        </div>
      </div>

      {/* Alternative Method */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-zinc-100 dark:bg-zinc-800" />
          Or Bank Transfer
          <span className="h-px w-12 bg-zinc-100 dark:bg-zinc-800" />
        </p>

        <div className="p-6 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-center gap-3 text-zinc-400 mb-2">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-black italic tracking-tighter text-zinc-500">
              UnionBank of the Philippines
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">
              HopeBegins Inc.
            </p>
            <p className="text-lg font-black text-brand italic tracking-tighter">
              1012 3456 7890
            </p>
          </div>
          <p className="text-[10px] text-zinc-400 font-medium italic">
            Please email your deposit slip to{' '}
            <span className="text-[#a3b281] font-bold">
              give@hopebegins.today
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

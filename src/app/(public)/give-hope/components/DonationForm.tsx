'use client';

import { Loader2 } from 'lucide-react';
import { useGiveHope } from '../hooks/useGiveHope';

export function DonationForm() {
  const {
    selectedAmount,
    setSelectedAmount,
    isMonthly,
    setIsMonthly,
    presetAmounts,
    handleDonate,
    isPending,
  } = useGiveHope();

  return (
    <section className="px-6 pb-16 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins text-center mb-6">
          Plant a Hope Seed
        </h2>

        {/* Amount Selector */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {presetAmounts.map((amount) => {
            const isSelected = selectedAmount === amount;
            return (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className="h-14 rounded-xl border-2 text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? '#acc487' : 'white',
                  borderColor: isSelected ? '#acc487' : '#e4e4e7',
                  color: isSelected ? 'white' : '#3f3f46',
                }}
              >
                ${amount}
              </button>
            );
          })}
        </div>

        {/* Monthly Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            id="isMonthly"
            checked={isMonthly}
            onChange={(e) => setIsMonthly(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 focus:ring-2"
            style={{ accentColor: '#acc487' }}
          />
          <label
            htmlFor="isMonthly"
            className="text-sm text-zinc-500 font-medium cursor-pointer"
          >
            Make this a monthly Hope Seed
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => handleDonate()}
          disabled={isPending}
          className="w-full h-14 rounded-xl font-bold text-white text-base transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          style={{ backgroundColor: '#90b0aa' }}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            `Plant a Hope Seed — $${selectedAmount}${isMonthly ? '/mo' : ''}`
          )}
        </button>
      </div>
    </section>
  );
}

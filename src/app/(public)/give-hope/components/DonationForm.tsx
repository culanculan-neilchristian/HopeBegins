'use client';

import { useState } from 'react';

import Image from 'next/image';
import gcashQrCode from '@/assets/images/gcash_qrcode.jpg';
import { useGiveHope } from '../hooks/useGiveHope';

export function DonationForm() {
  const {
    selectedAmount,
    setSelectedAmount,
    isCustom,
    setIsCustom,
    presetAmounts,
  } = useGiveHope();

  // Reset QR view if someone changes the amount
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setHasSubmitted(false);
  };

  const onCustomClick = () => {
    setIsCustom(true);
    setSelectedAmount(0); // Empty the field initially
    setHasSubmitted(false);
  };

  const onCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setSelectedAmount(value);
  };

  const onDonateClick = () => {
    setHasSubmitted(true);
  };

  return (
    <section className="px-6 pb-16 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins text-center mb-6">
          Plant a Hope Seed
        </h2>

        {/* Amount Selector */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {presetAmounts.map((amount) => {
            const isSelected = !isCustom && selectedAmount === amount;
            return (
              <button
                key={amount}
                onClick={() => onAmountClick(amount)}
                className="h-14 rounded-xl border-2 text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: isSelected ? '#acc487' : 'white',
                  borderColor: isSelected ? '#acc487' : '#e4e4e7',
                  color: isSelected ? 'white' : '#3f3f46',
                }}
              >
                ₱{amount}
              </button>
            );
          })}
          <button
            onClick={onCustomClick}
            className="h-14 rounded-xl border-2 text-sm font-bold transition-all duration-200"
            style={{
              backgroundColor: isCustom ? '#acc487' : 'white',
              borderColor: isCustom ? '#acc487' : '#e4e4e7',
              color: isCustom ? 'white' : '#3f3f46',
            }}
          >
            Custom
          </button>
        </div>

        {/* Custom Amount Input */}
        {isCustom && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">
                ₱
              </span>
              <input
                type="number"
                value={selectedAmount || ''}
                onChange={onCustomAmountChange}
                placeholder="Enter amount"
                className="w-full h-14 pl-10 pr-4 rounded-xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-[#acc487] outline-none font-bold text-zinc-800 dark:text-zinc-100 transition-colors"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* GCash QR Code (Conditional) */}
        {hasSubmitted && (
          <div className="mb-8 w-full max-w-md mx-auto overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <Image
              src={gcashQrCode}
              alt="GCash QR Code"
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        )}

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Submit Button */}
        <button
          onClick={onDonateClick}
          disabled={selectedAmount <= 0}
          className="w-full h-14 rounded-xl font-bold text-white text-base transition-opacity duration-200 flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#a3b281' }}
        >
          Plant a Hope Seed — ₱{selectedAmount}
        </button>
      </div>
    </section>
  );
}

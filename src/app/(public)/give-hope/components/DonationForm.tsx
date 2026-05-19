'use client';

import { Building2 } from 'lucide-react';
import Script from 'next/script';

export function DonationForm() {
  return (
    <section className="px-6 pb-16 max-w-2xl mx-auto">
      {/* Donorbox Embed */}
      <div className="flex justify-center w-full mb-12">
        <Script src="https://donorbox.org/widget.js" strategy="lazyOnload" />
        <iframe
          src="https://donorbox.org/embed/hope-begins-plant-a-hope-seed"
          name="donorbox"
          {...{ allowpaymentrequest: 'true' }}
          seamless
          frameBorder="0"
          scrolling="no"
          height="900px"
          width="100%"
          style={{ maxWidth: '500px', minWidth: '250px', maxHeight: 'none' }}
          allow="payment"
        />
      </div>

      {/* Alternative Method */}
      {/* <div className="mt-12 text-center">
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
      </div> */}
    </section>
  );
}

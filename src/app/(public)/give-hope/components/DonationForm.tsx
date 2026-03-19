import Image from 'next/image';
import gcashQrCode from '@/assets/images/gcash_qrcode.jpg';

export function DonationForm() {
  return (
    <section className="px-6 pb-16 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm flex flex-col items-center">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins text-center mb-6">
          Plant a Hope Seed
        </h2>

        <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          <Image
            src={gcashQrCode}
            alt="GCash QR Code"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { BonfireInlineChat } from '@/components/bonfire/BonfireInlineChat';

export default function HopeAIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative shrink-0 overflow-hidden px-6 pb-10 pt-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20" />
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="font-poppins text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 md:text-4xl">
            I Need to Talk to Hope AI
          </h1>
          <p className="text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
            A faith-filled conversation, anytime you need it.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-4">
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <BonfireInlineChat />
        </div>
      </section>

      <div className="pb-10 pt-4 text-center">
        <Link
          href="/prayers"
          className="text-sm font-medium text-zinc-400 underline underline-offset-4 transition-colors hover:text-[#acc487]"
        >
          I&apos;d rather talk to a real person - submit a prayer request
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Home, Compass, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-[#a3b18a]/10 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="relative w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center shadow-xl shadow-emerald-900/5">
          <HeartOff className="w-10 h-10 text-[#a3b18a]" />
        </div>
      </div>

      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold font-poppins text-[#6b634d] dark:text-zinc-100">
            404
          </h1>
          <h2 className="text-2xl font-bold font-poppins text-zinc-800 dark:text-zinc-200">
            This path seems a bit lost.
          </h2>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
          The page you&apos;re looking for might have moved, or the link may be
          broken. But don&apos;t worry &mdash; every journey has its detours,
          and we can find our way back together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            asChild
            className="rounded-2xl px-8 py-6 bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white font-bold h-auto shadow-lg shadow-[#a3b18a]/20"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-2xl px-8 py-6 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold h-auto hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <Link href="/hopecasts" className="flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Explore HopeCasts
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-20 opacity-30 select-none">
        <h3 className="text-sm font-bold text-[#6b634d] dark:text-zinc-500 tracking-[0.3em] uppercase">
          HopeBegins
        </h3>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, LogOut } from 'lucide-react';
import { useCarrierAuth } from '@/hooks/useCarrierAuth';

export default function CarrierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { logout } = useCarrierAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('carrierToken');
      const userStr = localStorage.getItem('carrierUser');

      if (!token || !userStr) {
        setIsAuthorized(false);
        setHasChecked(true);
        return;
      }

      try {
        const user = JSON.parse(userStr);
        setIsAuthorized(user.role === 'carrier' && user.is_approved);
      } catch {
        setIsAuthorized(false);
      }
      setHasChecked(true);
    };

    checkAuth();
  }, []);

  // Handle redirection
  useEffect(() => {
    if (hasChecked && !isAuthorized) {
      localStorage.clear();
      router.push('/login/carrier');
    }
  }, [hasChecked, isAuthorized, router]);

  if (!hasChecked || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 bg-[#b4c392]/20 rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Authorizing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 font-dm-sans flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/carrier/dashboard"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#b4c392] flex items-center justify-center shadow-lg shadow-[#b4c392]/20 transition-transform group-hover:scale-110">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-black italic tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
                  Carrier Hub
                </h2>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#b4c392]">
                  Portal
                </span>
              </div>
            </Link>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-5 py-2.5 text-zinc-400 hover:text-rose-500 transition-all rounded-2xl hover:bg-rose-50/50 group"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">
                Exit Hub
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

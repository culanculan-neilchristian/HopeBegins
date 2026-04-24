'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Loader2 } from 'lucide-react';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const checkAuth = () => {
      // Don't check auth on the login page itself
      if (pathname === '/admin/login') {
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('adminToken');
      const savedUser = localStorage.getItem('adminUser');

      if (!token || !savedUser) {
        router.push('/admin/login');
      } else {
        const parsedUser = JSON.parse(savedUser);

        // Enforce admin role
        if (parsedUser.role !== 'admin') {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
          return;
        }

        // If user state is empty but we have it in localStorage, restore it
        if (!user) {
          try {
            setUser(parsedUser);
          } catch (e) {
            console.error('Failed to parse saved admin user', e);
            router.push('/admin/login');
          }
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, user, setUser]);

  if (isLoading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa] dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldAlert,
  Radio,
  BarChart3,
  LogOut,
  Heart,
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { useUserStore } from '@/store/useUserStore';
import { notify } from '@/lib/notifications';
import { AdminAuthGuard } from './components/AdminAuthGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout: clearUserStore } = useUserStore();
  const isLoginPage = pathname === '/admin/login';

  const logoutMutation = useMutation({
    mutationFn: () => {
      const accessToken = localStorage.getItem('adminToken') || '';
      const refreshToken = localStorage.getItem('adminRefreshToken') || '';
      return adminService.logout(accessToken, refreshToken);
    },
    onSuccess: () => {
      // Clear local storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      localStorage.removeItem('adminUser');

      // Clear store
      clearUserStore();

      notify.success('Logged out successfully');
      router.push('/admin/login');
    },
    onError: (error: any) => {
      console.error('Logout error:', error);
      // Even if API fails, we should probably clear local state
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      localStorage.removeItem('adminUser');
      clearUserStore();
      router.push('/admin/login');
    },
  });

  const handleLogout = () => {
    // Clear local state immediately to ensure UI responsiveness
    const clearLocalAuth = () => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminRefreshToken');
      localStorage.removeItem('adminUser');
      clearUserStore();
      router.push('/admin/login');
    };

    const accessToken = localStorage.getItem('adminToken');
    const refreshToken = localStorage.getItem('adminRefreshToken');

    if (!accessToken || !refreshToken) {
      clearLocalAuth();
      return;
    }

    // Attempt server-side logout, but clear local state regardless
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        clearLocalAuth();
      },
    });
  };

  const MENU_ITEMS = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    {
      label: 'Manage Prayers',
      href: '/admin/manage-prayers',
      icon: ShieldAlert,
    },
    { label: 'Manage Hopecasts', href: '/admin/manage-hopecasts', icon: Radio },
    {
      label: 'Manage Hope Carriers',
      href: '/admin/manage-carriers',
      icon: Heart,
    },
    { label: 'Financials', href: '/admin/donations', icon: BarChart3 },
  ];

  if (isLoginPage) {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-dm-sans">
        <aside className="w-72 border-r bg-white dark:bg-zinc-900 flex flex-col sticky top-0 h-screen">
          <nav className="flex-1 px-4 space-y-2 mt-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-tight rounded-2xl transition-all ${
                  pathname === item.href
                    ? 'bg-brand-muted text-brand'
                    : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="w-full bg-brand-muted/50 p-4 rounded-2xl flex items-center justify-between group cursor-pointer border border-brand/10 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:border-rose-200 dark:hover:border-rose-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-muted/50 disabled:hover:border-brand/10"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-brand-foreground font-black shadow-lg shadow-brand/20 group-hover:group-enabled:bg-rose-600 transition-colors">
                  {logoutMutation.isPending ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'A'
                  )}
                </div>
                <div className="text-xs text-left">
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 group-hover:group-enabled:text-rose-600 transition-colors">
                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Super Admin
                  </p>
                </div>
              </div>
              {!logoutMutation.isPending && (
                <LogOut className="h-4 w-4 text-zinc-400 group-hover:group-enabled:text-rose-600 transition-colors" />
              )}
            </button>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}

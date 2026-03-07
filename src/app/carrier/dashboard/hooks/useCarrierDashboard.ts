import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { carrierService } from '@/services/carrierService';
import { notify } from '@/lib/notifications';

export type DashboardTab = 'available' | 'my-prayers' | 'completed';

export function useCarrierDashboard() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load user data on mount (lazy initialization)
  const [user] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('carrierUser');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error('Failed to parse carrier user', e);
        }
      }
    }
    return null;
  });

  // Handle tab state from search params
  const currentTab = (searchParams.get('tab') as DashboardTab) || 'available';

  const setTab = (tab: DashboardTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/carrier/dashboard?${params.toString()}`);
  };

  const {
    data: dashboardData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['carrier', 'dashboard', user?.id],
    queryFn: () => carrierService.getCarrierDashboardData(user?.id),
    refetchInterval: 30000,
    enabled: !!user?.id,
  });

  // Locally filter based on the active tab
  const prayers = useMemo(() => {
    if (!dashboardData) return [];
    if (currentTab === 'available') return dashboardData.available || [];
    if (currentTab === 'my-prayers') return dashboardData.my_prayers || [];
    if (currentTab === 'completed') return dashboardData.completed || [];
    return [];
  }, [dashboardData, currentTab]);

  const counts = useMemo(
    () => ({
      available: dashboardData?.stats?.available || 0,
      myPrayers: dashboardData?.stats?.my_prayers || 0,
      completed: dashboardData?.stats?.completed || 0,
    }),
    [dashboardData]
  );

  // Mutations
  const completeMutation = useMutation({
    mutationFn: ({ id, note }: { id: string; note?: string }) =>
      carrierService.markAsPrayed(id, note),
    onSuccess: () => {
      notify.success('Prayer lifted! Thank you for your support.');
      queryClient.invalidateQueries({ queryKey: ['carrier'] });
      setTab('completed');
    },
    onError: (error: any) => notify.error(error.message),
  });

  return {
    prayers,
    counts: counts || { available: 0, myPrayers: 0, completed: 0 },
    currentTab,
    setTab,
    isLoading,
    isFetching,
    completeMutation,
    startMutation: useMutation({
      mutationFn: (id: string) => carrierService.startPraying(id),
      onSuccess: () => {
        notify.success('You have started praying.');
        queryClient.invalidateQueries({ queryKey: ['carrier'] });
        setTab('my-prayers');
      },
      onError: (error: any) => notify.error(error.message),
    }),
    user,
  };
}

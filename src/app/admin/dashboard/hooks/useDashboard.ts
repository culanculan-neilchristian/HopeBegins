import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { subDays, format } from 'date-fns';

export function useDashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
  });

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getStats(),
  });

  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    refetch: refetchAnalytics,
  } = useQuery({
    queryKey: ['admin', 'analytics', dateRange],
    queryFn: () =>
      adminService.getAnalytics(dateRange.startDate, dateRange.endDate),
  });

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ startDate: start, endDate: end });
  };

  return {
    stats,
    analytics,
    dateRange,
    handleDateChange,
    isLoading: isStatsLoading || isAnalyticsLoading,
    isError: isStatsError || isAnalyticsError,
    refetch: () => {
      refetchStats();
      refetchAnalytics();
    },
  };
}

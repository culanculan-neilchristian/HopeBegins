import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';

// Static chart data (prayer/donation trend — replace when backend has time-series endpoint)
export const CHART_DATA = [
  { name: 'Mon', prayers: 40, plays: 2400 },
  { name: 'Tue', prayers: 30, plays: 1398 },
  { name: 'Wed', prayers: 200, plays: 9800 },
  { name: 'Thu', prayers: 278, plays: 3908 },
  { name: 'Fri', prayers: 189, plays: 4800 },
  { name: 'Sat', prayers: 239, plays: 3800 },
  { name: 'Sun', prayers: 349, plays: 4300 },
];

export function useDashboard() {
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getStats(),
  });

  return {
    stats,
    isLoading,
    isError,
    refetch,
  };
}

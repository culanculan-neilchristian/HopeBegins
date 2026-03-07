import { useState, useMemo, useCallback } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import { STATUS_CONFIG } from '../constants';
import type { Prayer, PrayerStatus } from '@/types/admin';

export function useManagePrayers() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Prayer | null>(null);
  const [assignTarget, setAssignTarget] = useState<Prayer | null>(null);
  const [statusFilter, setStatusFilter] = useState<PrayerStatus | 'ALL'>('ALL');

  // Reset to page 1 when filters change
  const handleStatusFilterChange = (status: PrayerStatus | 'ALL') => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['admin', 'prayers', page, search, statusFilter],
    queryFn: () => adminService.getPrayers(page, search, statusFilter),
    placeholderData: keepPreviousData,
  });

  const { data: carriersData } = useQuery({
    queryKey: ['admin', 'carriers'],
    queryFn: () => adminService.getCarriers(),
  });

  const carriers = useMemo(() => {
    return Array.isArray(carriersData)
      ? carriersData
      : ((carriersData as any)?.results ?? []);
  }, [carriersData]);

  const prayers: Prayer[] = useMemo(() => {
    return data?.results ?? [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data?.count ?? 0;
  }, [data]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalCount / 10)); // StandardResultsSetPagination has page_size = 10
  }, [totalCount]);

  // No longer need client-side filtering as it's done on the backend
  const filtered = prayers;

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deletePrayer(id),
    onSuccess: () => {
      notify.success('Prayer deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'prayers'] });
      setDeleteTarget(null);
    },
    onError: () => notify.error('Failed to delete prayer. Please try again.'),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: PrayerStatus }) =>
      adminService.updatePrayerStatus(id, status),
    onSuccess: (updated) => {
      notify.success(
        `Prayer marked as ${STATUS_CONFIG[updated.status].label}.`
      );
      queryClient.invalidateQueries({ queryKey: ['admin', 'prayers'] });
    },
    onError: () => notify.error('Failed to update prayer status.'),
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, carrierId }: { id: string; carrierId: string }) =>
      adminService.assignPrayer(id, { carrier_id: carrierId }),
    onSuccess: () => {
      notify.success('Prayer assigned successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'prayers'] });
      setAssignTarget(null);
    },
    onError: () => notify.error('Failed to assign prayer.'),
  });

  const handleToggle = useCallback(
    (id: string) => setExpandedId((prev) => (prev === id ? null : id)),
    []
  );

  const handleMarkPrayed = useCallback(
    (prayer: Prayer) =>
      statusMutation.mutate({ id: prayer.id, status: 'COMPLETED' }),
    [statusMutation]
  );

  const handleStatusChange = useCallback(
    (prayer: Prayer, status: PrayerStatus) =>
      statusMutation.mutate({ id: prayer.id, status }),
    [statusMutation]
  );

  return {
    // data
    prayers,
    carriers,
    filtered,
    isLoading,
    isFetching,
    isError,
    refetch,
    // state
    search,
    setSearch: handleSearchChange,
    expandedId,
    deleteTarget,
    setDeleteTarget,
    assignTarget,
    setAssignTarget,
    statusFilter,
    setStatusFilter: handleStatusFilterChange,
    page,
    setPage,
    totalPages,
    totalCount,
    // mutations
    deleteMutation,
    statusMutation,
    assignMutation,
    // handlers
    handleToggle,
    handleMarkPrayed,
    handleStatusChange,
  };
}

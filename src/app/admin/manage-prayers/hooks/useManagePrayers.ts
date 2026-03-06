import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import { STATUS_CONFIG } from '../constants';
import type { Prayer, PrayerStatus } from '@/types/admin';

export function useManagePrayers() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Prayer | null>(null);
  const [assignTarget, setAssignTarget] = useState<Prayer | null>(null);
  const [statusFilter, setStatusFilter] = useState<PrayerStatus | 'ALL'>('ALL');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'prayers'],
    queryFn: () => adminService.getPrayers(),
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
    return Array.isArray(data) ? data : ((data as any)?.results ?? []);
  }, [data]);

  const filtered = useMemo(() => {
    return prayers.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [prayers, search, statusFilter]);

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

  const handleSendFollowUp = useCallback((prayer: Prayer) => {
    notify.success(
      `Follow-up email queued for ${prayer.isAnonymous ? 'anonymous submitter' : prayer.email}.`
    );
  }, []);

  const handleMarkPrayed = useCallback(
    (prayer: Prayer) =>
      statusMutation.mutate({ id: prayer.id, status: 'PRAYED' }),
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
    isError,
    refetch,
    // state
    search,
    setSearch,
    expandedId,
    deleteTarget,
    setDeleteTarget,
    assignTarget,
    setAssignTarget,
    statusFilter,
    setStatusFilter,
    // mutations
    deleteMutation,
    statusMutation,
    assignMutation,
    // handlers
    handleToggle,
    handleMarkPrayed,
    handleStatusChange,
    handleSendFollowUp,
  };
}

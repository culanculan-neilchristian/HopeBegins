'use client';

import { useState, useMemo } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import { Donation } from '@/types/admin';

export function useDonations() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ONE_TIME' | 'MONTHLY'>(
    'ALL'
  );
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // undefined = closed, null = create, Donation = edit
  const [editTarget, setEditTarget] = useState<Donation | null | undefined>(
    undefined
  );
  const [deleteTarget, setDeleteTarget] = useState<Donation | null>(null);

  const {
    data: paginatedDonations,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
    refetch: refetchList,
  } = useQuery({
    queryKey: ['admin', 'donations', page, search, typeFilter],
    queryFn: () => adminService.getDonations(page, search, typeFilter),
    placeholderData: keepPreviousData,
  });

  const {
    data: stats,
    isLoading: isLoadingStats,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['admin', 'donations', 'overview'],
    queryFn: () => adminService.getDonationOverview(),
  });

  const handleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: Omit<Donation, 'id'>) =>
      adminService.createDonation(payload),
    onSuccess: () => {
      notify.success('Donation recorded successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'donations'] });
      setEditTarget(undefined);
    },
    onError: (err: any) =>
      notify.error(err.message || 'Failed to record donation.'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Donation> }) =>
      adminService.updateDonation(id, payload),
    onSuccess: () => {
      notify.success('Donation updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'donations'] });
      setEditTarget(undefined);
    },
    onError: (err: any) =>
      notify.error(err.message || 'Failed to update donation.'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteDonation(id),
    onSuccess: () => {
      notify.success('Donation record deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'donations'] });
      setDeleteTarget(null);
    },
    onError: (err: any) =>
      notify.error(err.message || 'Failed to delete donation.'),
  });

  const sortedResults = useMemo(() => {
    const raw = paginatedDonations?.results ?? [];
    return [...raw].sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1;
      if (sortBy === 'date') {
        return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      return mul * (a.amount - b.amount);
    });
  }, [paginatedDonations, sortBy, sortDir]);

  return {
    // Data
    filtered: sortedResults,
    stats: stats || {
      totalRaised: 0,
      totalDonors: 0,
      monthlyTotal: 0,
      avgDonation: 0,
    },
    isLoading: isLoadingList || isLoadingStats,
    isFetching: isFetchingList,
    totalCount: paginatedDonations?.count ?? 0,
    totalPages: Math.ceil((paginatedDonations?.count ?? 0) / 10),

    // State
    search,
    setSearch: (val: string) => {
      setSearch(val);
      setPage(1);
    },
    page,
    setPage,
    typeFilter,
    setTypeFilter: (val: 'ALL' | 'ONE_TIME' | 'MONTHLY') => {
      setTypeFilter(val);
      setPage(1);
    },
    sortBy,
    sortDir,
    handleSort,

    // Modals
    editTarget,
    setEditTarget,
    deleteTarget,
    setDeleteTarget,

    // Mutations
    createMutation,
    updateMutation,
    deleteMutation,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,

    // Utils
    refetchAll: () => {
      refetchList();
      refetchStats();
    },
  };
}

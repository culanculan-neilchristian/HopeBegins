'use client';

import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import type { HopeJourney } from '@/types/admin';

export function useHopeJourneys() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<HopeJourney | null>(null);

  // Debounced search (server-side)
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page on search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: paginatedData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      'admin',
      'daily-hope-journeys',
      page,
      debouncedSearch,
    ],
    queryFn: () => adminService.getJourneys(page, debouncedSearch),
  });

  const journeys: HopeJourney[] = useMemo(() => {
    return paginatedData?.results ?? [];
  }, [paginatedData]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteJourney(id),
    onSuccess: () => {
      notify.success('Subscriber removed from Daily Hope.');
      queryClient.invalidateQueries({
        queryKey: ['admin', 'daily-hope-journeys'],
      });
      setDeleteTarget(null);
    },
    onError: () => notify.error('Failed to remove subscriber.'),
  });

  return {
    journeys,
    totalCount: paginatedData?.count ?? 0,
    hasNext: !!paginatedData?.next,
    hasPrev: !!paginatedData?.previous,
    isLoading,
    isError,
    refetch,
    search,
    setSearch,
    page,
    setPage,
    deleteTarget,
    setDeleteTarget,
    deleteMutation,
  };
}

import { useState, useMemo, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import type { HopeCarrier } from '@/types/admin';

export type SortOption = 'recent' | 'oldest' | 'name' | 'prayers';

export function useManageCarriers() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<
    'ALL' | 'PENDING' | 'ACTIVE'
  >('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedCarrier, setSelectedCarrier] = useState<HopeCarrier | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<HopeCarrier | null>(null);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset page on search
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Custom Setters that also reset page
  const handleSetFilterStatus = (status: 'ALL' | 'PENDING' | 'ACTIVE') => {
    setFilterStatus(status);
    setPage(1);
  };

  const handleSetSortBy = (sort: SortOption) => {
    setSortBy(sort);
    setPage(1);
  };

  // Map SortOption to Backend Ordering
  const backendOrdering = useMemo(() => {
    switch (sortBy) {
      case 'recent':
        return '-date_joined';
      case 'oldest':
        return 'date_joined';
      case 'name':
        return 'first_name,last_name';
      case 'prayers':
        return '-prayer_count';
      default:
        return '-date_joined';
    }
  }, [sortBy]);

  const { data: paginatedData, isLoading, isFetching } = useQuery({
    queryKey: ['admin', 'carriers', page, debouncedSearch, filterStatus, backendOrdering],
    queryFn: () =>
      adminService.getCarriers(
        page,
        debouncedSearch,
        filterStatus,
        backendOrdering
      ),
    placeholderData: keepPreviousData,
  });

  const carriers = useMemo(() => paginatedData?.results ?? [], [paginatedData]);

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminService.approveCarrier(id),
    onSuccess: (updatedCarrier) => {
      notify.success(`${updatedCarrier.first_name} has been approved!`);
      queryClient.invalidateQueries({ queryKey: ['admin', 'carriers'] });
      if (selectedCarrier?.id === updatedCarrier.id) {
        setSelectedCarrier(updatedCarrier);
      }
    },
    onError: (error: any) => {
      notify.error(error.message || 'Failed to approve carrier');
    },
  });

  const handleApprove = (
    e: React.MouseEvent | React.FocusEvent,
    id: string
  ) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    approveMutation.mutate(id);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteCarrier(id),
    onSuccess: () => {
      notify.success('Carrier deleted successfully');
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ['admin', 'carriers'] });
    },
    onError: (error: any) => {
      notify.error(error.message || 'Failed to delete carrier');
    },
  });

  return {
    carriers,
    filteredCarriers: carriers, // Now filtered on the backend
    totalCount: paginatedData?.count ?? 0,
    hasNext: !!paginatedData?.next,
    hasPrev: !!paginatedData?.previous,
    isLoading,
    isFetching,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    filterStatus,
    setFilterStatus: handleSetFilterStatus,
    sortBy,
    setSortBy: handleSetSortBy,
    selectedCarrier,
    setSelectedCarrier,
    approveMutation,
    handleApprove,
    deleteMutation,
    deleteTarget,
    setDeleteTarget,
  };
}

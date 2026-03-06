import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import type { HopeCarrier } from '@/types/admin';

export type SortOption = 'recent' | 'oldest' | 'name' | 'prayers';

export function useManageCarriers() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'ALL' | 'PENDING' | 'ACTIVE'
  >('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [selectedCarrier, setSelectedCarrier] = useState<HopeCarrier | null>(
    null
  );

  const { data: carriers = [], isLoading } = useQuery({
    queryKey: ['admin', 'carriers'],
    queryFn: () => adminService.getCarriers(),
  });

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

  const filteredCarriers = useMemo(() => {
    const filtered = carriers.filter((carrier) => {
      const matchesSearch =
        carrier.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        carrier.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        carrier.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === 'ALL' ||
        (filterStatus === 'PENDING' && !carrier.is_approved) ||
        (filterStatus === 'ACTIVE' && carrier.is_approved);

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime();
        case 'oldest':
          return new Date(a.date_joined).getTime() - new Date(b.date_joined).getTime();
        case 'name':
          return `${a.first_name} ${a.last_name}`.localeCompare(
            `${b.first_name} ${b.last_name}`
          );
        case 'prayers':
          return b.prayer_count - a.prayer_count;
        default:
          return 0;
      }
    });
  }, [carriers, searchQuery, filterStatus, sortBy]);

  const handleApprove = (
    e: React.MouseEvent | React.FocusEvent,
    id: string
  ) => {
    if (e && 'stopPropagation' in e) e.stopPropagation();
    approveMutation.mutate(id);
  };

  return {
    carriers,
    filteredCarriers,
    isLoading,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    selectedCarrier,
    setSelectedCarrier,
    approveMutation,
    handleApprove,
  };
}

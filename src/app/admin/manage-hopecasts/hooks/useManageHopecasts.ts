import { useState, useMemo, useCallback } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { notify } from '@/lib/notifications';
import type {
  Hopecast,
  HopecastCategory,
  HopecastPayload,
} from '@/types/admin';

export function useManageHopecasts() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Hopecast | null>(null);
  // undefined = modal closed, null = create mode, Hopecast = edit mode
  const [editTarget, setEditTarget] = useState<Hopecast | null | undefined>(
    undefined
  );

  // Reset to page 1 when search change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const {
    data: rawHopecasts,
    isLoading: isLoadingCasts,
    isFetching: isFetchingCasts,
    isError: isErrorCasts,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'hopecasts', page, search],
    queryFn: () => adminService.getHopecasts(page, search),
    placeholderData: keepPreviousData,
  });

  const { data: rawCategories } = useQuery({
    queryKey: ['admin', 'hopecast-categories'],
    queryFn: () => adminService.getHopecastCategories(),
  });

  const hopecasts: Hopecast[] = useMemo(() => {
    return rawHopecasts?.results ?? [];
  }, [rawHopecasts]);

  const totalCount = useMemo(() => {
    return rawHopecasts?.count ?? 0;
  }, [rawHopecasts]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalCount / 10)); // HopecastPagination has page_size = 10
  }, [totalCount]);

  const categories: HopecastCategory[] = useMemo(() => {
    return Array.isArray(rawCategories)
      ? rawCategories
      : ((rawCategories as any)?.results ?? []);
  }, [rawCategories]);

  const filtered = hopecasts; // server side filtering now

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteHopecast(id),
    onSuccess: () => {
      notify.success('Hopecast deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'hopecasts'] });
      setDeleteTarget(null);
    },
    onError: () => notify.error('Failed to delete hopecast.'),
  });

  const createMutation = useMutation({
    mutationFn: (payload: HopecastPayload) =>
      adminService.createHopecast(payload),
    onSuccess: () => {
      notify.success('Hopecast published!');
      queryClient.invalidateQueries({ queryKey: ['admin', 'hopecasts'] });
      setEditTarget(undefined);
    },
    onError: () => notify.error('Failed to create hopecast.'),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<HopecastPayload>;
    }) => adminService.updateHopecast(id, payload),
    onSuccess: () => {
      notify.success('Hopecast updated!');
      queryClient.invalidateQueries({ queryKey: ['admin', 'hopecasts'] });
      setEditTarget(undefined);
    },
    onError: () => notify.error('Failed to update hopecast.'),
  });

  const handleSave = useCallback(
    (payload: HopecastPayload) => {
      if (editTarget) {
        updateMutation.mutate({ id: editTarget.id, payload });
      } else {
        createMutation.mutate(payload);
      }
    },
    [editTarget, createMutation, updateMutation]
  );

  return {
    // data
    hopecasts,
    filtered,
    categories,
    isLoadingCasts,
    isFetchingCasts,
    isErrorCasts,
    refetch,
    // state
    search,
    setSearch: handleSearchChange,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    page,
    setPage,
    totalCount,
    totalPages,
    // mutations
    deleteMutation,
    isSavePending: createMutation.isPending || updateMutation.isPending,
    // handlers
    handleSave,
  };
}

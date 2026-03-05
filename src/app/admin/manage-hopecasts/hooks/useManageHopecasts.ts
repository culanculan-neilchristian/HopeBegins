import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  const [deleteTarget, setDeleteTarget] = useState<Hopecast | null>(null);
  // undefined = modal closed, null = create mode, Hopecast = edit mode
  const [editTarget, setEditTarget] = useState<Hopecast | null | undefined>(
    undefined
  );

  const {
    data: rawHopecasts,
    isLoading: isLoadingCasts,
    isError: isErrorCasts,
    refetch,
  } = useQuery({
    queryKey: ['admin', 'hopecasts'],
    queryFn: () => adminService.getHopecasts(),
  });

  const { data: rawCategories } = useQuery({
    queryKey: ['admin', 'hopecast-categories'],
    queryFn: () => adminService.getHopecastCategories(),
  });

  const hopecasts: Hopecast[] = useMemo(() => {
    return Array.isArray(rawHopecasts)
      ? rawHopecasts
      : ((rawHopecasts as any)?.results ?? []);
  }, [rawHopecasts]);

  const categories: HopecastCategory[] = useMemo(() => {
    return Array.isArray(rawCategories)
      ? rawCategories
      : ((rawCategories as any)?.results ?? []);
  }, [rawCategories]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return hopecasts.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.verse && c.verse.toLowerCase().includes(q)) ||
        c.category_details?.some((cat) => cat.name.toLowerCase().includes(q))
    );
  }, [hopecasts, search]);

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
    isErrorCasts,
    refetch,
    // state
    search,
    setSearch,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    // mutations
    deleteMutation,
    isSavePending: createMutation.isPending || updateMutation.isPending,
    // handlers
    handleSave,
  };
}

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siteSettingsService, PopoutItem } from '@/services/siteSettingsService';
import { toast } from 'sonner';

export function useManagePopouts() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<PopoutItem | null>(null);
  const [editTarget, setEditTarget] = useState<PopoutItem | null | undefined>(undefined);

  // Queries
  const { data: settings, isLoading: isSettingsLoading } = useQuery({
    queryKey: ['popout-settings'],
    queryFn: () => siteSettingsService.getSettings(),
  });

  const { data: items = [], isLoading: isItemsLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['popout-items'],
    queryFn: () => siteSettingsService.getItems(),
  });

  // Mutations
  const updateSettingsMutation = useMutation({
    mutationFn: (data: any) => siteSettingsService.updateSettings(settings.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popout-settings'] });
      queryClient.invalidateQueries({ queryKey: ['popout-public'] });
      toast.success('Settings updated successfully');
    },
    onError: () => toast.error('Failed to update settings'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => siteSettingsService.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popout-items'] });
      queryClient.invalidateQueries({ queryKey: ['popout-public'] });
      setDeleteTarget(null);
      toast.success('Item deleted successfully');
    },
    onError: () => toast.error('Failed to delete item'),
  });

  const saveMutation = useMutation({
    mutationFn: (data: Partial<PopoutItem>) => {
      if (editTarget?.id) {
        return siteSettingsService.updateItem(editTarget.id, data);
      }
      return siteSettingsService.createItem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popout-items'] });
      queryClient.invalidateQueries({ queryKey: ['popout-public'] });
      setEditTarget(undefined);
      toast.success(editTarget?.id ? 'Item updated' : 'Item created');
    },
    onError: () => toast.error('Failed to save item'),
  });

  const filtered = items.filter((item) =>
    item.message.toLowerCase().includes(search.toLowerCase())
  );

  return {
    settings,
    isSettingsLoading,
    items,
    filtered,
    isLoading: isItemsLoading || isSettingsLoading,
    isFetching,
    isError,
    refetch,
    search,
    setSearch,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    deleteMutation,
    updateSettingsMutation,
    saveMutation,
    handleSave: (data: Partial<PopoutItem>) => saveMutation.mutate(data),
  };
}

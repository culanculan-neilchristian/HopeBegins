'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Organization, OrganizationPayload } from '@/types/admin';
import { notify } from '@/lib/notifications';

export function useManageOrganizations() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Organization | null>(null);
  const [editTarget, setEditTarget] = useState<Organization | null | undefined>(
    undefined
  );

  const {
    data: organizations = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['organizations', 'admin'],
    queryFn: organizationService.getOrganizations,
  });

  const filtered = useMemo(() => {
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [organizations, search]);

  const saveMutation = useMutation({
    mutationFn: (data: { id?: string; payload: OrganizationPayload }) => {
      if (data.id) {
        return organizationService.updateOrganization(data.id, data.payload);
      }
      return organizationService.createOrganization(data.payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      notify.success(
        `Organization ${editTarget?.id ? 'updated' : 'created'} successfully.`
      );
      setEditTarget(undefined);
    },
    onError: (error: any) => {
      notify.error(error.message || 'Failed to save organization.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: organizationService.deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      notify.success('Organization deleted successfully.');
      setDeleteTarget(null);
    },
    onError: (error: any) => {
      notify.error(error.message || 'Failed to delete organization.');
    },
  });

  const handleSave = (payload: OrganizationPayload) => {
    saveMutation.mutate({
      id: editTarget?.id,
      payload,
    });
  };

  return {
    organizations,
    filtered,
    isLoading,
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
    isSavePending: saveMutation.isPending,
    handleSave,
  };
}

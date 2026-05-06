import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import hopeStoryService, { HopeStory } from '@/services/hopeStoryService';
import { toast } from 'sonner';

export function useManageStories() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<HopeStory | null>(null);

  const {
    data: stories = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['admin-hope-stories'],
    queryFn: () => hopeStoryService.getAllStories(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'APPROVED' | 'REJECTED' }) =>
      hopeStoryService.updateStoryStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-hope-stories'] });
      toast.success(`Story ${variables.status.toLowerCase()} successfully.`);
    },
    onError: () => {
      toast.error('Failed to update story status.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => hopeStoryService.deleteStory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hope-stories'] });
      toast.success('Story deleted successfully.');
      setDeleteTarget(null);
    },
    onError: () => {
      toast.error('Failed to delete story.');
    },
  });

  const filtered = stories.filter((story: HopeStory) => {
    const matchesSearch =
      story.full_name.toLowerCase().includes(search.toLowerCase()) ||
      story.testimonial.toLowerCase().includes(search.toLowerCase()) ||
      story.occupation?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return {
    stories,
    filtered,
    isLoading,
    isFetching,
    isError,
    refetch,
    search,
    setSearch,
    deleteTarget,
    setDeleteTarget,
    updateStatusMutation,
    deleteMutation,
  };
}

/* eslint-disable prettier/prettier */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { prayerSchema } from '@/types/prayer';
import { prayerService } from '@/services/prayerService';
import { notify } from '@/lib/notifications';

export function usePrayerForm() {
  const queryClient = useQueryClient();

  const form = useForm<any>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      title: '',
      email: '',
      content: '',
      category: 'GENERAL',
      isAnonymous: false,
      shareFirstName: true,
      wantsFollowUp: false,
      website: '',
    },
  });

  const mutation = useMutation({
    mutationFn: prayerService.createPrayer,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['prayers'] });
      notify.success(
        data?.message ||
        'Your prayer has been submitted. We are praying for you!'
      );
      form.reset();
    },
    onError: (error: any) => {
      notify.error(
        error.message || 'Failed to submit prayer. Please try again.'
      );
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
  };
}

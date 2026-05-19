/* eslint-disable prettier/prettier */
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { prayerSchema } from '@/types/prayer';
import { prayerService } from '@/services/prayerService';
import { organizationService } from '@/services/organizationService';
import { notify } from '@/lib/notifications';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePrayerForm() {
  const queryClient = useQueryClient();

  const { data: organizations = [] } = useQuery({
    queryKey: ['organizations', 'public'],
    queryFn: organizationService.getPublicOrganizations,
  });

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
      lastNameHoney: '',
      startTime: 0,
      organizationId: null,
    },
  });

  useEffect(() => {
    form.setValue('startTime', Date.now());
  }, [form]);

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
    // Handle "none" organization selection
    const payload = {
      ...data,
      organizationId: data.organizationId === 'none' ? null : data.organizationId,
    };
    mutation.mutate(payload);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
    organizations,
  };
}

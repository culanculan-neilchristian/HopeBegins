'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { dailyHopeService } from '@/services/dailyHopeService';
import { toast } from 'sonner';

const dailyHopeSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type DailyHopeFormValues = z.infer<typeof dailyHopeSchema>;

export function useDailyHopeForm() {
  const form = useForm<DailyHopeFormValues>({
    resolver: zodResolver(dailyHopeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: DailyHopeFormValues) =>
      dailyHopeService.subscribe({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      }),
    onSuccess: (response) => {
      const message =
        response?.message || 'Welcome to your 21-day Hope Journey!';
      toast.success(message);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(
        error.message || 'Failed to start journey. Please try again.'
      );
    },
  });

  const onSubmit = (data: DailyHopeFormValues) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
  };
}

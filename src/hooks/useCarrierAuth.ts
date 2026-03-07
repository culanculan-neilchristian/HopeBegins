'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { config } from '@/config';
import { notify } from '@/lib/notifications';

import { fetchWithAuth } from '@/services/api';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function useCarrierAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = await fetchWithAuth(`${config.API_URL}/users/login/`, {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (!data || data.user?.role !== 'carrier') {
        throw new Error(
          'Access denied. This portal is for Hope Carriers only.'
        );
      }

      if (!data.user?.is_approved) {
        throw new Error('Your account is pending admin approval.');
      }

      // Store tokens
      localStorage.setItem('carrierToken', data.access);
      localStorage.setItem('carrierRefreshToken', data.refresh);
      localStorage.setItem('carrierUser', JSON.stringify(data.user));

      notify.success(`Welcome back, ${data.user.first_name || 'Carrier'}`);
      router.push('/carrier/dashboard');
    } catch (err: any) {
      setError(err.message);
      notify.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('carrierToken');
    localStorage.removeItem('carrierRefreshToken');
    localStorage.removeItem('carrierUser');
    queryClient.clear();
    router.push('/login/carrier');
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    error,
    logout,
  };
}

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { userService } from '@/services/userService';
import { notify } from '@/lib/notifications';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function useResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get('uid');
  const token = searchParams.get('token');

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    if (!uidb64 || !token) {
      notify.error('Invalid password reset link.');
    }
  }, [uidb64, token]);

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!uidb64 || !token) {
      notify.error('Missing reset token. Please request a new link.');
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.resetPassword({
        uidb64,
        token,
        new_password: values.password,
      });
      setIsSuccess(true);
      notify.success('Password reset successfully!');
      setTimeout(() => {
        router.push('/login/carrier');
      }, 3000);
    } catch (error: any) {
      notify.error(error.message || 'Failed to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    isSuccess,
    hasToken: !!(uidb64 && token),
  };
}

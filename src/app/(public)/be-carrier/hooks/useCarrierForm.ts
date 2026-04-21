/* eslint-disable prettier/prettier */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
  carrierApplicationSchema,
  CarrierApplicationFormData,
} from '@/types/carrier';
import { userService } from '@/services/userService';
import { notify } from '@/lib/notifications';

export function useCarrierForm() {
  const form = useForm<CarrierApplicationFormData>({
    resolver: zodResolver(carrierApplicationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      church_community: '',
      carrier_reason: '',
      agreed_to_guidelines: false,
      website: '',
    },
  });

  const mutation = useMutation({
    mutationFn: userService.applyAsCarrier,
    onSuccess: (data: any) => {
      notify.success(
        data?.message ||
        'Your application is being reviewed. If approved, we will send a temporary password to your email.'
      );
      form.reset();
    },
    onError: (error: any) => {
      notify.error(
        error.message || 'Failed to submit application. Please try again.'
      );
    },
  });

  const onSubmit = (data: CarrierApplicationFormData) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: mutation.isPending,
  };
}

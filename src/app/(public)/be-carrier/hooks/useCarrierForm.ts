import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { carrierApplicationSchema, CarrierApplicationFormData } from '@/types/carrier';
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
    },
  });

  const mutation = useMutation({
    mutationFn: userService.applyAsCarrier,
    onSuccess: () => {
      notify.success('Your application has been submitted! We will review it soon.');
      form.reset();
    },
    onError: (error: any) => {
      notify.error(error.message || 'Failed to submit application. Please try again.');
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

'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { notify } from '@/lib/notifications';

const PRESET_AMOUNTS = [10, 25, 50, 100];

export function useGiveHope() {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [isMonthly, setIsMonthly] = useState(false);

  const donationMutation = useMutation({
    mutationFn: () =>
      userService.submitDonation({
        amount: selectedAmount,
        donation_type: isMonthly ? 'MONTHLY' : 'ONE_TIME',
      }),
    onSuccess: () => {
      notify.success(
        `Thank you for planting a $${selectedAmount} Hope Seed! Your generosity changes lives.`
      );
    },
    onError: (error: any) => {
      notify.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  return {
    selectedAmount,
    setSelectedAmount,
    isMonthly,
    setIsMonthly,
    presetAmounts: PRESET_AMOUNTS,
    handleDonate: donationMutation.mutate,
    isPending: donationMutation.isPending,
  };
}

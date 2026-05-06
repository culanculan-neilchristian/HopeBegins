'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { donationService, DonationRequest } from '@/services/donationService';
import { notify } from '@/lib/notifications';

const PRESET_AMOUNTS = [100, 500, 1000];

export function useGiveHope() {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [isCustom, setIsCustom] = useState(false);
  const [donationType, setDonationType] = useState<'ONE_TIME' | 'MONTHLY'>(
    'ONE_TIME'
  );
  const [coversFee, setCoversFee] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const donationMutation = useMutation({
    mutationFn: (data: DonationRequest) =>
      donationService.createCheckoutSession(data),
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      window.location.href = data.checkout_url;
    },
    onError: (error: any) => {
      notify.error(
        error.response?.data?.error || 'Something went wrong. Please try again.'
      );
    },
  });

  return {
    selectedAmount,
    setSelectedAmount,
    isCustom,
    setIsCustom,
    donationType,
    setDonationType,
    coversFee,
    setCoversFee,
    name,
    setName,
    email,
    setEmail,
    presetAmounts: PRESET_AMOUNTS,
    handleDonate: () =>
      donationMutation.mutate({
        amount: selectedAmount,
        donation_type: donationType,
        covers_fee: coversFee,
        name: name || 'Anonymous',
        email: email,
      }),
    isPending: donationMutation.isPending,
    isSuccess: donationMutation.isSuccess,
  };
}

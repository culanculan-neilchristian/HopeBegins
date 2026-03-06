import { z } from 'zod';

export const carrierApplicationSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  church_community: z.string().optional(),
  carrier_reason: z.string().min(10, 'Please share a bit more about your heart (min 10 characters)'),
  agreed_to_guidelines: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the guidelines',
  }),
});

export type CarrierApplicationFormData = z.infer<typeof carrierApplicationSchema>;

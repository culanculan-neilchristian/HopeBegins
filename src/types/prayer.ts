import { z } from 'zod';

export const prayerSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  content: z.string().min(10, 'Prayer concern must be at least 10 characters'),
  category: z.enum([
    'GENERAL',
    'ANXIETY_FEAR',
    'HEALTH',
    'FINANCE',
    'RELATIONSHIP',
    'OTHER',
  ]),
  isAnonymous: z.boolean(),
  shareFirstName: z.boolean().default(true),
  wantsFollowUp: z.boolean().default(false),
  website: z.string().optional(),
  userId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Prayer = z.infer<typeof prayerSchema>;

export const prayerResponseSchema = z.object({
  id: z.string().uuid(),
  prayerId: z.string().uuid(),
  content: z.string(),
  userId: z.string(),
  createdAt: z.string(),
});

export type PrayerResponse = z.infer<typeof prayerResponseSchema>;

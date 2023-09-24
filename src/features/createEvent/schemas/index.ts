import { z } from 'zod';

export const createEventSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  is_weekly: z.boolean(),
  schedules: z.array(z.object({
    date: z.string().min(3).max(255),
    period: z.number().min(1).max(10),
  })),
});
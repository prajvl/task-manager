import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 characters')
    .trim(),
  description: z.string()
    .max(500, 'Description must be at most 500 characters')
    .optional()
    .or(z.literal('')),
  status: z.enum(['pending', 'completed'], {
    errorMap: () => ({ message: 'Status must be pending or completed' })
  }).default('pending')
});

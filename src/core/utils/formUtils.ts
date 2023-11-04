import { z } from 'zod';

export const nonempty = z
  .string()
  .transform((t) => t?.trim())
  .pipe(z.string().min(1, { message: 'Required' }));

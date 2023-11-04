import { z } from 'zod';

export const audioDetailSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  file_duration: z.string(),
  wave_data: z.string().optional(),
});

export type AudioDetailType = z.infer<typeof audioDetailSchema>;

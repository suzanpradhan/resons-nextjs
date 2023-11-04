import { z } from 'zod';
import { countriesDetailSchema } from '../countries/countriesType';

export const accountDetailSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string(),
  profile_image: z.string(),
  nickname: z.string(),
  country: countriesDetailSchema.optional(),
  language: z.string().optional(),
});

export type AccountDetailType = z.infer<typeof accountDetailSchema>;

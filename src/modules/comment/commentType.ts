import { z } from 'zod';
import { accountDetailSchema } from '../account/accountType';
import { audioDetailSchema } from '../audio/audioType';

export const commentDetailSchema = z.object({
  id: z.number().optional(),
  comment: z.string(),
  time_duration: z.number().optional(),
  is_ai_generated: z.number().optional(),
  total_likes: z.string().optional(),
  created_at_human: z.string(),
  my_like: z.boolean(),
  audio: audioDetailSchema,
  owner: accountDetailSchema,
});
export type CommentDetailType = z.infer<typeof commentDetailSchema>;

export interface CommentFormType {
  post_id: number;
  file: File;
  file_duration?: string | number;
  wave_data?: string;
}

export const dataArrySchema = z
  .object({
    data: z.array(commentDetailSchema),
  })
  .refine((data) => Array.isArray(data.data), {
    message: 'Invalid data format. Expected an array.',
  });

export type DataArryType = z.infer<typeof dataArrySchema>;

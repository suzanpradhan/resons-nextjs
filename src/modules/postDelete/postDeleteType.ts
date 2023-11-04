import { z } from 'zod';

export const postDeleteDetailSchema = z.object({
    post_id: z.number().optional(),
});
export type PostDeleteDetailSchema = z.infer<typeof postDeleteDetailSchema>;

export interface PostDeleteFormType {
    post_id: number;
}
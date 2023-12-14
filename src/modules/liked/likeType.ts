import { z } from 'zod';
import { profileDetailSchema } from '../profile/profileType';

export const likeDetailSchema = z.object({
    post_id: z.number().optional(),
    like: z.boolean().optional()
});
export type LikeDetailType = z.infer<typeof likeDetailSchema>;

export const getPostLikeDetailSchema = z.object({
    user: profileDetailSchema
});
export type GetPostLikeDetailType = z.infer<typeof getPostLikeDetailSchema>;

export interface LikeFormType {
    post_id: number;
    like: boolean;
}

export interface LikeFormCommentType {
    post_comment_id: number;
    like: boolean;
}
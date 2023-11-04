import { z } from 'zod';
import { postDetailSchema } from '../post/postType';
import { profileDetailSchema } from '../profile/profileType';

export const notificationDetailSchema = z.object({
    post_id: z.number().optional(),
});
export type NotificationDetailSchema = z.infer<typeof notificationDetailSchema>;

export interface NotificationFormDetailType {
    key: string | undefined;
    value: string | undefined;
}

export const notificationDataType = z.object({
    post_id: z.number().optional(),
    follower_id: z.number().optional(),
    user_id: z.number().optional(),
    name: z.string().optional(),
    message: z.string().optional(),
    type: z.string().optional(),
    post: postDetailSchema.optional(),
    user: profileDetailSchema.optional(),
    follower: profileDetailSchema.optional()
});

export const notificationListDetailSchema = z.object({
    id: z.string(),
    read_at: z.string(),
    created_at: z.string(),
    created_at_human: z.string(),
    data: notificationDataType
});

export type NotificationListDetailType = z.infer<typeof notificationListDetailSchema>;
import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const followerDetailSchema = z.object({
    id: z.number(),
    name: z.string().pipe(nonempty),
    email: z.string().optional(),
    profile_image: z.string().optional(),
    nickname: z.string().optional(),
    followers: z.number(),
    following: z.number(),
    follow_status: z.boolean()
});

export type FollowerDetailType = z.infer<typeof followerDetailSchema>;

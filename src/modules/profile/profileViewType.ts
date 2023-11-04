import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const profileViewSchema = z.object({
    id: z.number(),
    name: z.string().pipe(nonempty),
    email: z.string().optional(),
    user_type: z.string().optional(),
    status: z.number().optional(),
    phone_number: z.string().optional(),
    created_date: z.string().optional(),
    profile_image: z.string().optional(),
    gender: z.string().optional(),
    date_of_birth: z.string().optional(),
    marital_status: z.string().optional(),
    nickname: z.string().optional(),
    religion: z.string().optional(),
    about: z.string().optional(),
    facebook_profile_link: z.string().optional(),
    twitter_profile_link: z.string().optional(),
    linkedin_profile_link: z.string().optional(),
    user_agent: z.string().optional(),
    user_language: z.string().optional(),
    profile_hits: z.string().optional(),
    followers: z.number(),
    following: z.number(),
    total_tracks: z.number(),
    follow_status: z.boolean(),
});

export type ProfileViewType = z.infer<typeof profileViewSchema>;

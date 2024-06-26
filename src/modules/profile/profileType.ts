import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';
import { countriesDetailSchema } from '../countries/countriesType';
import { settingsDetailSchema } from '../settings/settingsType';

export const profileDetailSchema = z.object({
    id: z.number(),
    name: z.string().pipe(nonempty),
    email: z.string().optional(),
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
    total_posts: z.number(),
    total_stories: z.number(),
    bio: z.string().optional(),
    total_tracks: z.number(),
    country: countriesDetailSchema.optional(),
    settings: z.array(settingsDetailSchema).optional(),
    follow_status: z.boolean(),
});

export const passwordChangeSchema = z.object({
    current_password: z.string().pipe(nonempty),
    password: z.string().pipe(nonempty),
    password_confirmation: z.string().pipe(nonempty),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
});

export type ProfileDetailType = z.infer<typeof profileDetailSchema>;

export type ProfileUpdateResponseType = {
    user?: ProfileDetailType
}

export const profileUpdateFormSchema = z.object({
    name: z.string().pipe(nonempty).optional(),
    phone_number: z.string().optional(),
    profile_image: z.custom<File>((val) => (val instanceof File), "optional").optional(),
    date_of_birth: z.string().optional(),
    nickname: z.string().optional(),
    religion: z.string().optional(),
    about: z.string().optional(),
    user_language: z.string().optional(),
    country_id: z.number().optional(),
})

export type ProfileUpdateFormType = z.infer<typeof profileUpdateFormSchema>

export type ChangePasswordFormType = z.infer<typeof passwordChangeSchema>;

// export interface ChangePasswordFormType {
//     current_password: string;
//     password: string;
//     password_confirmation: string;
// }
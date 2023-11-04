import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const signUpFormSchema = z.object({
    name: z.string().pipe(nonempty),
    email: z.string().email(),
    password: z.string().pipe(nonempty),
    password_confirmation: z.string().pipe(nonempty),
});

export type SignUpRequestType = z.infer<typeof signUpFormSchema>;
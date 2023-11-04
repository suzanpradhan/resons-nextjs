import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().pipe(nonempty),
});

export type LoginRequestType = z.infer<typeof loginFormSchema>;
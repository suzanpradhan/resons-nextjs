import { z } from 'zod';

export const termsDetailSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.string().optional(),
    updated_at: z.string().optional(),
});

export type TermsDetailType = z.infer<typeof termsDetailSchema>;

import { z } from 'zod';

export const shareDetailSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
});
export type ShareDetailType = z.infer<typeof shareDetailSchema>;
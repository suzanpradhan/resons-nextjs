import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const topicsDetailSchema = z.object({
    id: z.number(),
    title: z.string().pipe(nonempty),
});

export type TopicsDetailType = z.infer<typeof topicsDetailSchema>;

export interface TopicsDataType {
    [key: string]: TopicsDetailType[];
}


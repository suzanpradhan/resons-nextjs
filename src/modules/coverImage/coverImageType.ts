import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const coverImageDetailSchema = z.object({
    id: z.number(),
    file_path: z.string().pipe(nonempty),
    color_code: z.string().pipe(nonempty),
});

export type CoverImageDetailType = z.infer<typeof coverImageDetailSchema>;

export interface CoverImageDataType {
    [key: string]: CoverImageDetailType[];
}


import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const coverImageDetailSchema = z.object({
    id: z.number(),
    file_path: z.string().pipe(nonempty),
    file: z.custom<File | undefined>().optional(),
    color_code: z.string().optional(),
});

export type CoverImageDetailType = z.infer<typeof coverImageDetailSchema>;

export interface CoverImageDataType {
    [key: string]: CoverImageDetailType[];
}


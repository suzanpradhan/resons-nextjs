import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const genresDetailSchema = z.object({
    id: z.number(),
    title: z.string().pipe(nonempty),
    image: z.string().optional(),
});

export type GenresDetailType = z.infer<typeof genresDetailSchema>;

export interface GenreDataType {
    [key: string]: GenresDetailType[];
}


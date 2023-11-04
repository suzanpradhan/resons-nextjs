import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const settingsDetailSchema = z.object({
    key: z.string(),
    value: z.string().pipe(nonempty),
    updated_at: z.string()
});

export type SettingsDetailType = z.infer<typeof settingsDetailSchema>;

export interface GenreDataType {
    [key: string]: SettingsDetailType[];
}
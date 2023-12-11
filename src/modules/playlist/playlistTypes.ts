import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const playlistDetailSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  privacy_code: z.number().optional()
});
export type PlaylistDetailType = z.infer<typeof playlistDetailSchema>;

export interface AddPlaylistFormType {
  playlist_id: string;
  audio_id: number;
}

export interface RemovePlaylistFormType {
  playlist_id: number;
  audio_id: number;
}

export const addPlaylistFormSchema = z.object({
  privacy_code: z.string(),
  playlist_cover: z.custom<File>((val) => (val instanceof File), "optional").optional(),
  title: z.string().pipe(nonempty)
})

// export type AddPlaylistFormType = z.infer<typeof addPlaylistFormSchema>
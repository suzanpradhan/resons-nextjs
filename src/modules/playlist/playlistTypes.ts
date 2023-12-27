import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';

export const playlistDetailSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  privacy_code: z.number().optional(),
  isMine: z.boolean().optional()
});


export const playlistItemSchema = z.object({
  id: z.number(),
  audio_id: z.number(),
  title: z.string(),
  total_likes: z.number(),
  owner: z.string(),
  duration: z.string(),
});

export const playlistFormSchema = playlistDetailSchema.extend({
  image: z.custom<File>().optional(),
});

export type PlaylistDetailType = z.infer<typeof playlistDetailSchema>;
export type PlaylistFormType = z.infer<typeof playlistFormSchema>;
export type PlaylistItemType = z.infer<typeof playlistItemSchema>;

export interface AddPlaylistFormType {
  playlist_id: string;
  post_id: number;
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
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
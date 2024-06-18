import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';
import { AudioDetailType } from '../audio/audioType';

export const genresDetailSchema = z.object({
    id: z.number(),
    title: z.string().pipe(nonempty),
    image: z.string().optional(),
});

export const genrePlaylistItemSchema = z.object({
    id: z.number(),
    audio_id: z.number(),
    title: z.string(),
    total_likes: z.number(),
    owner: z.string(),
    duration: z.string(),
});

export type GenresDetailType = z.infer<typeof genresDetailSchema>;
export type GenrePlaylistItemType = z.infer<typeof genrePlaylistItemSchema>;

export interface NowPlayingType {
    id: number;
    cover_image: string;
    title: string;
    owner: string;
    duration: string;
    audio: AudioDetailType;
}

export interface GenrePlaylist {
    genre: GenresDetailType,
    items: PaginatedResponseType<GenrePlaylistItemType>;
    nowPlaying?: NowPlayingType
}

export interface GenreDataType {
    [key: string]: GenresDetailType[];
}


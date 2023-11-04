import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';
import { accountDetailSchema } from '../account/accountType';
import { audioDetailSchema } from '../audio/audioType';
import { CommentDetailType, commentDetailSchema } from '../comment/commentType';
import { genresDetailSchema } from '../genres/genresType';
import { profileDetailSchema } from '../profile/profileType';

export const postDetailSchema = z.object({
  id: z.number().optional(),
  title: z.string().pipe(nonempty),
  description: z.string(),
  privacy_code: z.number().optional(),
  total_likes: z.number(),
  total_comments: z.number(),
  time_duration: z.number().optional(),
  is_ai_generated: z.number().optional(),
  created_at_human: z.string(),
  my_like: z.boolean(),
  total_duration: z.number(),
  audio: audioDetailSchema,
  owner: accountDetailSchema,
  cover_image: z.string(),
  commenter_image: z.array(z.string()).optional(),
  comment_count: z.number().optional(),
  comments: z.array(commentDetailSchema).optional(),
  genres: z.array(genresDetailSchema).optional(),
});

export const postEachDetailSchema = z.object({
  post: postDetailSchema,
  comments: z.array(commentDetailSchema),
});

export const searchDetailSchema = z.object({
  posts: z.array(postDetailSchema),
  people: z.array(profileDetailSchema),
});

export type PostDetailType = z.infer<typeof postDetailSchema>;
export type SearchDetailType = z.infer<typeof searchDetailSchema>;

export type PostEachDetailType = {
  post: PostDetailType;
  comments: PaginatedResponseType<CommentDetailType>;
};

export interface PostFormType {
  title: string;
  audio_file: File;
  file_duration?: number;
  wave_data?: number[] | string | Blob;
  privacy_code: string;
  expiration_type: string;
  language: string;
  cover_image_id: string;
  remember_my_language: string;
  color_code: string;
  tags: any;
  is_ai_generated: string | Blob;
}

export interface SearchFormType {
  searchText: string | null;
  searchType: string | null;
}

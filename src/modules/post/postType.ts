import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { nonempty } from '@/core/utils/formUtils';
import { z } from 'zod';
import { accountDetailSchema } from '../account/accountType';
import { audioDetailSchema } from '../audio/audioType';
import { CommentDetailType, commentDetailSchema } from '../comment/commentType';
import { coverImageDetailSchema } from '../coverImage/coverImageType';
import { genresDetailSchema } from '../genres/genresType';
import { profileDetailSchema } from '../profile/profileType';

// export const postFormDetailsSchema = z.object({
//   id: z.number().optional(),
//   title: z.string().pipe(nonempty),
//   cover_image_id: z.number().optional(),
//   location: z.string().optional(),
//   language: z.string().optional(),
//   privacy_code: z.number().optional(),
//   // time_duration: z.number().optional(),
//   // is_ai_generated: z.number().optional(),
//   // total_duration: z.number(),
//   // audio: audioDetailSchema,
//   // owner: accountDetailSchema,
//   expiration: z.string(),
//   tag: z.string().array()
// });

// export type PostFormDetailsType = z.infer<typeof postFormDetailsSchema>;



export const postDetailSchema = z.object({
  id: z.number(),
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

export const postFormSchema = z.object({
  title: z.string().min(2).pipe(nonempty),
  audio_file: z.custom<File | undefined>().optional(),
  file_duration: z.number().optional(),
  wave_data: z.array(z.number()).or(z.string()).or(z.instanceof(Blob)).optional(),
  privacy_code: z.string(),
  expiration_type: z.string(),
  language: z.string().optional(),
  // cover_image_id: z.string().optional(),
  // cover_image: z.custom<File>((val) => (val instanceof File), "optional").optional(),
  cover_image: coverImageDetailSchema.optional(),
  remember_my_language: z.string(),
  genres: z.array(z.number()),
  is_ai_generated: z.string().or(z.instanceof(Blob)),
});

export type PostFormType = z.infer<typeof postFormSchema>;

export const postValidateFormSchema = postFormSchema.extend({
  cover_image: coverImageDetailSchema,
  wave_data: z.array(z.number()).or(z.string()).or(z.instanceof(Blob)),
});

export type PostValidateFormType = z.infer<typeof postValidateFormSchema>;

// export interface PostDefaultFormType {
//   title: string;
//   audio_file: File;
//   file_duration?: number;
//   wave_data?: number[] | string | Blob;
//   privacy_code: string;
//   expiration_type: string;
//   language: string;
//   cover_image_id?: string;
//   cover_image?: File;
//   remember_my_language: string;
//   color_code: string;
//   tags: any;
//   is_ai_generated: string | Blob;
// }

export interface SearchFormType {
  searchText: string | null;
  searchType: string | null;
}

export interface SearchTagsReturnType { }

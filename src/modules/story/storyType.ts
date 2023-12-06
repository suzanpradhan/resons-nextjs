import { z } from 'zod';
import { accountDetailSchema } from '../account/accountType';
import { audioDetailSchema } from '../audio/audioType';

export const storyDetailSchema = z.object({
  story_id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  file_link: z.string(),
  file_duration: z.string().optional(),
  privacy_code: z.number(),
  total_views: z.number(),
  owner_id: z.number(),
  owner_name: z.string(),
  profile_image: z.string(),
  audio_id: z.number(),
});

export type StoryDetailType = z.infer<typeof storyDetailSchema>;

export const myStoryDetailSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  file_link: z.string(),
  file_duration: z.string().optional(),
  privacy_code: z.number(),
  audio: audioDetailSchema,
  owner: accountDetailSchema,
  created_at_human: z.string(),
});

export type MyStoryDetailType = z.infer<typeof myStoryDetailSchema>;

export interface StoryFormType {
  title: string;
  audio_file: File;
  description: string;
  privacy_code: string | Blob;
  file_duration?: number;
  wave_data?: number[];
  is_ai_generated: string | Blob;
}

export interface StoryDataType {
  [key: string]: StoryDetailType[];
}

export interface StoryAudioType {
  story_id: number,
  id: number,
  file_path: string,
  file_name: string,
  file_duration: string,
  file_size: string,
  wave_data: string
}

export interface StorySingleDataType {
  owner_name: string,
  owner_id: number,
  profile_image: string,
  story_id: number,
  title: string,
  privacy_code: number,
  total_views: number,
  created_at_human: number,
  audio: StoryAudioType,
}

export interface StoryListType {
  data: StorySingleDataType[],
  pagination: {
    count: number,
    currentPage: number,
    perPage: number,
    total: number,
    totalPages: number
  }
}